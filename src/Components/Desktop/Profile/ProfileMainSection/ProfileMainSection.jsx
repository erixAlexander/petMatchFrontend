import EditProfile from "./EditProfile";
import EditImages from "./EditImages";
import EditlookingFor from "./EditlookingFor";
import ChangePassword from "../ProfileSecuritySection/ChangePassword";
import ChangeEmail from "../ProfileSecuritySection/ChangeEmail";
import Changeusername from "../ProfileSecuritySection/ChangeUsername";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./ProfileMainSection.css";

const ProfileMainSection = ({ section, setSection }) => {
  const navigate = useNavigate();
  return (
    <div className="profile-main-container">
      <div className="goback-btn-container">
        <button onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon icon={faIdCard} style={{ fontSize: 14 }} />
          Dashboard
        </button>
      </div>
      {section === "editprofile" && <EditProfile setSection={setSection} />}
      {section === "editimages" && <EditImages />}
      {section === "editlookingfor" && <EditlookingFor />}
      {section === "editpassword" && <ChangePassword />}
      {section === "editemail" && <ChangeEmail />}
      {section === "editusername" && <Changeusername />}
    </div>
  );
};

export default ProfileMainSection;
