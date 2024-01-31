import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  try {
    let navigate = useNavigate();
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = async () => {
      await axiosPrivate.get(`logout`, {
        withCredentials: true,
      });
      removeCookie("userId", cookies.userId);
      removeCookie("authToken", cookies.authToken);
      setAuth({ accessToken: null, user: null });
      navigate("/");
    };
    return logout;
  } catch (error) {
    console.log(error);
  }
};

export default useLogout;
