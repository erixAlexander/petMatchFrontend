import React from "react";
import "./AppLink.css";
import image from "../../assets/expo.png";
import androidQR from "../../assets/android-expo.svg";
import iosQR from "../../assets/ios-expo.svg";

const AppLink = ({ fontColor }) => {
  return (
    <div className={`app-link-container ${fontColor === "black" && "black"}`}>
      <h1>Hi Friend! </h1>
      <p>If you are joining us form a cellphone </p> <br />
      <p>you may want to try our app.</p>
      <div className="expo-container">
        <img src={image} alt="Get it on Google Play" />
        <div className="qrs-container">
          <div className="qr-container">
            <p>Expo Go in Android</p>
            <img src={androidQR} alt="Get it on Google Play" />
          </div>
          <div className="qr-container">
            <p>Expo Go in iOS</p>
            <img src={iosQR} alt="Get it on Google Play" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLink;
