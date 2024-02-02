import { useState, useEffect } from "react";
import AppName from "../../../Components/Desktop/Home/AppName/AppName";
import Navbar from "../../../Components/Desktop/Home/Navbar/Navbar";
import Signin from "../../../Components/Desktop/Home/Signin/Signin";
import "./Home.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home-background">
      {windowWidth < 600 ? (
        <p>Dummy text</p>
      ) : (
        <>
          <Navbar setOpenModal={setOpenModal} />
          <AppName />
          <Signin openModal={openModal} setOpenModal={setOpenModal} />
        </>
      )}
    </div>
  );
};

export default Home;
