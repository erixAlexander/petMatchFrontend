import React from "react";
import "./AppLink.css";
import image from "../../assets/expo.png";

const AppLink = ({ fontColor }) => {
  return (
    <div className={`app-link-container ${fontColor === "black" && "black"}`}>
      <h1>Hi Friend! </h1>
      <p>If you are joining us form a cellphone </p> <br />
      <p>you may want to try our app.</p>
      <a
        href="https://play.google.com/store/apps/details?id=com.petgram"
        target="_blank"
        rel="noreferrer"
      >
        <img src={image} alt="Get it on Google Play" />
      </a>
    </div>
  );
};

export default AppLink;
