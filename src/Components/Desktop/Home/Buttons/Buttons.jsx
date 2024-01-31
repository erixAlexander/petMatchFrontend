import { Link } from "react-router-dom";
import useLogout from "../../../../hooks/useLogout";
import "./Buttons.css";

const Buttons = ({ isLoggedIn, setOpenModal }) => {
  const logout = useLogout();

  return (
    <div className="btns">
      {isLoggedIn ? (
        <>
          <button onClick={() => logout()} className="btn">
            Log Out
          </button>
          <Link className="btn" to="dashboard">
            Dashboard
          </Link>
        </>
      ) : (
        <>
          <button onClick={() => setOpenModal("login")} className="btn">
            Log in
          </button>
          <button onClick={() => setOpenModal("signup")} className="btn">
            Sign up
          </button>
        </>
      )}
    </div>
  );
};

export default Buttons;
