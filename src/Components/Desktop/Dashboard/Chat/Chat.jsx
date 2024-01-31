import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import ChatDisplay from "./ChatDisplay/ChatDisplay";
import MatchesDisplay from "./Matches/MatchesDisplay";
import ChatConversation from "./ChatDisplay/ChatConversation";
import useAuth from "../../../../hooks/useAuth";
import "./Chat.css";

const Chat = ({ displayChat }) => {
  const [show, setShow] = useState("matches");
  const [matches, setMatches] = useState([]);
  const socket = useRef(null);
  const socketURL = import.meta.env.VITE_APP_SOCKET;
  const { auth } = useAuth();

  useEffect(() => {
    socket.current = io(socketURL);
    socket.current?.emit("addUserToSocketArray", auth.user?.user_id);
  }, []);

  return (
    <div className={`chat-container ${displayChat && "display"}`}>
      <div className="chat-header">
        <div
          className={`chat-header-item ${
            show === "matches" && "chat-header-item-active"
          }`}
          onClick={() => setShow("matches")}
        >
          Matches
        </div>
        <div
          className={`chat-header-item ${
            show === "chat" && "chat-header-item-active"
          }`}
          onClick={() => setShow("chat")}
        >
          Chat
        </div>
      </div>
      {show === "matches" && (
        <MatchesDisplay
          setShow={setShow}
          matches={matches}
          setMatches={setMatches}
        />
      )}
      {show === "chat" && (
        <ChatDisplay matches={matches} setShow={setShow} socket={socket} />
      )}
      {show !== "matches" && show !== "chat" && (
        <ChatConversation match={show} socket={socket} />
      )}
    </div>
  );
};

export default Chat;
