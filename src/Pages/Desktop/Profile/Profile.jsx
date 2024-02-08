import { useEffect, useState } from "react";
import ProfileMainSection from "../../../Components/Desktop/Profile/ProfileMainSection/ProfileMainSection";
import ProfileSidebar from "../../../Components/Desktop/Profile/ProfileSidebar/ProfileSidebar";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [section, setSection] = useState("editprofile");

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user.email && !auth?.user?.images?.length) {
      navigate("/onboarding");
    }
  }, [auth?.user]);

  if (auth?.user?.images?.length)
    return (
      <div className="profile-container">
        <ProfileSidebar setSection={setSection} />
        <ProfileMainSection section={section} setSection={setSection} />
      </div>
    );
};

export default Profile;
