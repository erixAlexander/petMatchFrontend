import { useState } from "react";
import AppName from "../../../Components/Desktop/Home/AppName/AppName";
import Navbar from "../../../Components/Desktop/Home/Navbar/Navbar";
import Signin from "../../../Components/Desktop/Home/Signin/Signin";
import "./Home.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="home-background">
      <Navbar setOpenModal={setOpenModal} />
      <AppName />
      <Signin openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Home;
