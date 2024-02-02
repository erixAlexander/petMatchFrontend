import React from "react";
import image from "../../assets/expo.png";
import androidQR from "../../assets/android-expo.svg";
import iosQR from "../../assets/ios-expo.svg";
import square from "../../assets/square.svg";
import "./AppLink.css";

const AppLink = ({ fontColor }) => {
  const [OS, setOS] = React.useState("android");
  return (
    <div className={`app-link-container ${fontColor === "black" && "black"}`}>
      <h1>Hi Friend! </h1>
      <p>If you are joining us form a cellphone </p> <br />
      <p>you may want to try our app.</p>
      <div className="expo-container">
        <img src={image} alt="Get it on Google Play" />
        <div className="qrs-container">
          <div className="qr-container">
            <p onClick={() => setOS("android")}>Expo Go on Android</p>
            {OS === "android" ? (
              <img src={androidQR} alt="Get it on Google Play" />
            ) : (
              <img
                style={{ width: "180px" }}
                src={square}
                alt="QR Code Placeholder"
              ></img>
            )}
          </div>
          <div className="qr-container">
            <p onClick={() => setOS("ios")}>Expo Go on iOS</p>
            {OS === "ios" ? (
              <img src={iosQR} alt="Get it on Google Play" />
            ) : (
              <img
                style={{ width: "180px" }}
                src={square}
                alt="QR Code Placeholder"
              ></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLink;
