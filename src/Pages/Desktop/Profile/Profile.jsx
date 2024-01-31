import ProfileMainSection from "../../../Components/Desktop/Profile/ProfileMainSection/ProfileMainSection";
import ProfileSidebar from "../../../Components/Desktop/Profile/ProfileSidebar/ProfileSidebar";
import "./Profile.css";

import { useState } from "react";

const Profile = () => {
  const [section, setSection] = useState("editprofile");

  return (
    <div className="profile-container">
      <ProfileSidebar setSection={setSection} />
      <ProfileMainSection section={section} setSection={setSection} />
    </div>
  );
};

export default Profile;
