import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../../api/axios";
import { useCookies } from "react-cookie";
import useAuth from "../../../../hooks/useAuth";

const SignInButton = ({
  openModal,
  validPassword,
  validEmail,
  validMatch,
  setError,
  email,
  password,
}) => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies("user");
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validPassword) {
        setError(`Password must be 8 to 24 characters long.
        Must include uppercase and lowercase letters, a number and a special character .!@#$%`);
        return;
      }
      if (!validEmail) {
        setError("You need to enter a valid Email address");
        return;
      }
      if (openModal === "signup" && !validMatch) {
        setError("Passwords need to match");
        return;
      }

      const response = await axiosPrivate.post(
        `${openModal === "signup" ? "signup" : "login"}`,
        { email, password },
        { withCredentials: true }
      );

      setCookie("userId", response.data.userId, {
        maxAge: 60 * 60 * 20,
      });

      setAuth((prev) => ({ ...prev, accessToken: response.data.token }));

      const success = response.status === 201;
      if (success && openModal === "signup") navigate("/onboarding");
      if (success && openModal === "login") navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.message) {
        setError(error.response.data);
        return;
      }
      setError(error.response.data);
    }
  };
  return (
    <button onClick={(e) => handleSubmit(e)} className="signin-btn">
      {openModal === "signup" ? "Sign Up" : "Log In"}
    </button>
  );
};

export default SignInButton;
