import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../../hooks/useAuth";
import ChatInput from "./ChatInput";
import "./ChatDisplay.css";

const ChatConversation = ({ match, socket }) => {
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const { auth, setAuth } = useAuth();
  const user = auth.user;

  const newMessage = ({ userId, message, notification }) => {
    const newMssg = {
      from_user_id: userId,
      message: message,
      timestamp: new Date().toISOString(),
      _id: uuid(),
    };

    setMessages((prev) => {
      return [...prev, newMssg];
    });
  };

  const getAllMessages = async (userId, match) => {
    const sentMessages = await axiosPrivate.get(`/messages`, {
      params: {
        fromUserId: userId,
        toUserId: match.user_id,
      },
    });

    const receivedMessages = await axiosPrivate.get(`/messages`, {
      params: {
        fromUserId: match.user_id,
        toUserId: userId,
      },
    });

    setMessages(
      [...sentMessages.data, ...receivedMessages.data].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateA - dateB;
      })
    );
  };

  const readMessage = async (match_id, userId) => {
    try {
      await axiosPrivate.put(`/read-message`, {
        match_id,
        userId,
      });
      setAuth((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          user_matches: prev.user.user_matches.map((match) => {
            if (match.user_id === match_id) {
              return {
                ...match,
                notification: false,
              };
            }
            return match;
          }),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages(user.user_id, match);
    readMessage(match.user_id, user.user_id);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.current?.on("newMessage", newMessage);
    return () => {
      socket.current.off("newMessage", newMessage);
    };
  }, []);

  return (
    <div className="chat-conversation-container">
      <div className="chat-conversation-messages-container" ref={scrollViewRef}>
        {messages.map((message) => {
          const messageDate = new Date(message.timestamp);
          const currentDate = new Date();

          return (
            <div
              className="message-container"
              style={
                message.from_user_id === user.user_id
                  ? {
                      justifyContent: "flex-end",
                    }
                  : {}
              }
            >
              {message.from_user_id !== user.user_id && (
                <div className="chat-conversation-message-profile-picture-container">
                  <img
                    src={match.images[0].url}
                    alt="Profile"
                    className="chat-conversation-message-profile-picture"
                  />
                  <p className="pet-name">{match.pet_name}</p>
                </div>
              )}
              <div
                key={message._id}
                className={`chat-conversation-message ${
                  message.from_user_id === user.user_id
                    ? "chat-conversation-message-sent"
                    : "chat-conversation-message-received"
                }`}
              >
                <p className="chat-conversation-message-text">
                  {message.message}
                </p>
                <p className="chat-conversation-message-timestamp">
                  {messageDate.getDate() === currentDate.getDate() &&
                  messageDate.getMonth() === currentDate.getMonth() &&
                  messageDate.getFullYear() === currentDate.getFullYear()
                    ? messageDate.toLocaleTimeString()
                    : messageDate.toLocaleDateString()}
                </p>
              </div>
              {message.from_user_id === user.user_id && (
                <div className="chat-conversation-message-profile-picture-container">
                  <img
                    src={user.images[0].url}
                    alt="Profile"
                    className="chat-conversation-message-profile-picture"
                  />
                  <p className="pet-name">{user.pet_name}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ChatInput
        match={match}
        setMessages={setMessages}
        userId={user.user_id}
        socket={socket}
      />
    </div>
  );
};

export default ChatConversation;
