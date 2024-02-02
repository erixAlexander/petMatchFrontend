import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useCookies } from "react-cookie";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AppLink from "../Pages/Cellphone/AppLink";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cookies] = useCookies();
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const logout = useLogout();
  const { setAuth } = useAuth();
  const userId = cookies.userId;
  const axiosPrivate = useAxiosPrivate();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getUser = async (userId) => {
    console.log("Persist");
    try {
      const response = await axiosPrivate.get(`user`, {
        params: { userId },
      });
      setAuth((prev) => ({ ...prev, user: response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        await getUser(userId);
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.accessToken
      ? verifyRefreshToken()
      : getUser(userId) && setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {windowWidth < 650 ? (
        <AppLink fontColor={"black"} />
      ) : auth?.accessToken && cookies.userId && auth?.user ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "25px",
          }}
        >
          <h3>You are Logged Out!</h3>
          <button style={{ padding: "10px" }} onClick={() => logout()}>
            Go Back Home
          </button>
        </div>
      )}
    </>
  );
};

export default PersistLogin;
