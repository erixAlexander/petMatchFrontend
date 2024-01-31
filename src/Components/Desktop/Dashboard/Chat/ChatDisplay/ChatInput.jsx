import { useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import uuid from "react-uuid";
import "./ChatDisplay.css";

const ChatInput = ({ match, setMessages, userId, socket }) => {
  const [text, setText] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const sendMessage = async () => {
    const id = uuid();
    const message = {
      timestamp: new Date().toISOString(),
      from_user_id: userId,
      to_user_id: match.user_id,
      message: text.trim(),
    };
    if (message.message === "") {
      setText("");
      return;
    }

    try {
      setText("");
      const response = await axiosPrivate.post(`/message`, {
        message,
      });

      if (response.status == 200) {
        await axiosPrivate.put(`/write-message`, {
          myUserId: userId,
          clickedUserId: match.user_id,
        });
        setMessages((prev) => [...prev, { ...message, _id: id }]);
        socket?.current.emit("sendMessage", {
          userId: userId,
          receiverId: match.user_id,
          message: message.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-conversation-input-container">
      <input
        type="text"
        className="chat-conversation-input"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage} className="chat-conversation-send-button">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
