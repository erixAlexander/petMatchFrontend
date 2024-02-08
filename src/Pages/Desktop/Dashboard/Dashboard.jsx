import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Desktop/Dashboard/Header/Header";
import Chat from "../../../Components/Desktop/Dashboard/Chat/Chat";
import Cards from "../../../Components/Desktop/Dashboard/Cards/Cards";
import "./Dashboard.css";

const Dashboard = () => {
  const [displayChat, setDisplayChat] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user.email && !auth?.user?.images.length) {
      navigate("/onboarding");
    }
  }, [auth?.user]);

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
