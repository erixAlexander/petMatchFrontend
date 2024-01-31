import { useCookies } from "react-cookie";
import Buttons from "../Buttons/Buttons";
import logo from "../../../../assets/icon.png";
import "./Navbar.css";

const Navbar = ({ setOpenModal }) => {
  const [cookies] = useCookies();

  return (
    <div className="navbar">
      <div className="slogan">
        <img src={logo} alt="logo" />
        <h2>Let's meet our new fury friends</h2>
      </div>

      <Buttons isLoggedIn={cookies.userId} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Navbar;
