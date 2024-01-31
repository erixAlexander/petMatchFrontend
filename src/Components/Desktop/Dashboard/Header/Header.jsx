import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../../hooks/useAuth";
import useLogout from "../../../../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ setDisplayChat }) => {
  const logout = useLogout();
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log("🚀 ~ Header ~ auth:", auth);

  return (
    <div className="header-container">
      <Link to={"/profile"}>
        <div className="user-info-container">
          <img src={auth?.user?.images[0].url} alt="profile-img" />
          <h2>{auth?.user?.pet_name}</h2>
        </div>
      </Link>
      <div className="user-settings-container">
        <FontAwesomeIcon
          onClick={() => setDisplayChat((prev) => !prev)}
          id="logout"
          icon={faMessage}
        />
        <FontAwesomeIcon
          onClick={() => navigate("/profile")}
          id="gear"
          icon={faGear}
        />
        <FontAwesomeIcon
          onClick={() => logout()}
          id="logout"
          icon={faRightFromBracket}
        />
      </div>
    </div>
  );
};

export default Header;
