import React from "react";
import image from "../../../assets/expo.png";
import androidQR from "../../../assets/android-expo.svg";
import iosQR from "../../../assets/ios-expo.svg";
import square from "../../../assets/square.svg";
import googleplay from "../../../assets/googleplay.png";
import appstore from "../../../assets/appstore.png";
import "./ExpoPage.css";

const ExpoPage = () => {
  const [OS, setOS] = React.useState("android");
  return (
    <div className="expogo-container">
      <h1>Try our app on Expo Go</h1>

      <p>
        If you don't have install please visit this link from your phone first!
      </p>

      <div className="app-stores-container">
        <a href="https://apps.apple.com/us/app/expo-go/id982107779">
          <img src={appstore} alt="Download on the App Store" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share">
          <img src={googleplay} alt="Get it on Google Play" />
        </a>
      </div>

      <p>
        After that you can scan the QR code below to open the app on your phone.
      </p>
      <div className="expo-container">
        <img src={image} alt="Get it on Google Play" />
        <div className="qrs-container">
          <div className="qr-container">
            <p onClick={() => setOS("android")}>Expo Go on Android</p>
            {OS === "android" ? (
              <img src={androidQR} alt="Get it on Google Play" />
            ) : (
              <img
                style={{ width: "145px" }}
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
                style={{ width: "145px" }}
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

export default ExpoPage;
