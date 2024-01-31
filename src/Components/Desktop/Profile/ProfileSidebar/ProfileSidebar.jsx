import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ setSection }) => {
  return (
    <div className="profile-sidebar-container">
      <h1 className="settings-title">Settings</h1>

      <div className="sidebar-section">
        <div className="section-title">
          <FontAwesomeIcon icon={faUser} style={{ fontSize: 14 }} />
          <h2>My Profile</h2>
        </div>
        <p onClick={() => setSection("editprofile")}>Edit profile</p>
        <p onClick={() => setSection("editlookingfor")}>Looking For</p>
        <p onClick={() => setSection("editimages")}>Edit Images</p>
      </div>

      <div className="sidebar-section">
        <div className="section-title">
          <FontAwesomeIcon icon={faLock} style={{ fontSize: 14 }} />
          <h2>Account Settings</h2>
        </div>
        <p onClick={() => setSection("editpassword")}>Change Password</p>
        <p onClick={() => setSection("editemail")}>Change Email</p>
        <p onClick={() => setSection("editusername")}>Change Username</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
