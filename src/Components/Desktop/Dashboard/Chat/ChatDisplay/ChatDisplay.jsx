import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../../hooks/useAuth";
import Loading from "../../../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightDots } from "@fortawesome/free-solid-svg-icons";
import "./ChatDisplay.css";

const ChatDisplay = ({ matches, setShow, socket }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const newMessage = ({ userId, message, notification }) => {
    const newMssg = {
      from_user_id: userId,
      message: message,
      timestamp: new Date().toISOString(),
    };
    const updatedMatches = auth.user.user_matches.map((match) => {
      if (match.user_id === userId) {
        return { ...match, notification: notification };
      } else {
        return match;
      }
    });
    setAuth({ ...auth, user: { ...auth.user, user_matches: updatedMatches } });
    setMessages((prev) =>
      prev.map((prevMessage) => {
        if (prevMessage.match.user_id === userId) {
          return { ...prevMessage, messageInformation: newMssg };
        } else {
          return prevMessage;
        }
      })
    );
  };

  const getLastMessage = async (userId, match) => {
    try {
      const response = await axiosPrivate.get(`/messages/native`, {
        params: {
          userId: userId,
          correspondingUserId: match.user_id,
        },
      });

      return { match, messageInformation: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.current?.on("newMessage", newMessage);
    return () => {
      socket.current.off("newMessage", newMessage);
    };
  }, []);

  useEffect(() => {
    const fetchLastMessages = async () => {
      try {
        const promises = matches.map((match) =>
          getLastMessage(auth.user.user_id, match)
        );
        const results = await Promise.all(promises);
        const orderedMessages = results.sort((a, b) => {
          const dateA = new Date(a.messageInformation.timestamp);
          const dateB = new Date(b.messageInformation.timestamp);
          return dateB - dateA;
        });
        setMessages(orderedMessages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchLastMessages();
  }, [matches, auth.user.user_id]);

  return loading ? (
    <Loading />
  ) : (
    <div className="chat-display-container">
      {messages.map((message) => {
        return (
          <div
            onClick={() => setShow(message.match)}
            className="chat-display-match"
            key={message.match.user_id}
          >
            <div className="chat-display-match-image-container">
              <img
                className="chat-display-match-image"
                src={message.match.images[0].url}
                alt="match"
              />
              <div className="chat-display-match-name">
                {message.match.pet_name}
              </div>
            </div>
            <div className="chat-display-match-info">
              <div className="chat-display-match-last-message">
                {message.messageInformation.message.substring(0, 12)}...
              </div>
              <div className="notification-container">
                {auth.user.user_matches.find(
                  (userMatch) => userMatch.user_id === message.match.user_id
                ).notification && <div className="notification-dot"></div>}
                {message.messageInformation.from_user_id ===
                auth.user.user_id ? (
                  <FontAwesomeIcon icon={faArrowUpRightDots} color={"red"} />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowUpRightDots}
                    color={"green"}
                    style={{ transform: "rotate(180deg)" }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatDisplay;
