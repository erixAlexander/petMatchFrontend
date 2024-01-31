import { useState } from "react";
import Header from "../../../Components/Desktop/Dashboard/Header/Header";
import Chat from "../../../Components/Desktop/Dashboard/Chat/Chat";
import Cards from "../../../Components/Desktop/Dashboard/Cards/Cards";
import "./Dashboard.css";

const Dashboard = () => {
  const [displayChat, setDisplayChat] = useState(false); // [TODO

  return (
    <div className="dashboard-container">
      <Header setDisplayChat={setDisplayChat} />
      <div className="dashboard-body">
        <Chat displayChat={displayChat} />
        <Cards />
      </div>
    </div>
  );
};

export default Dashboard;
