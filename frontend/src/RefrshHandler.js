import { useEffect } from "react";
import { APIUrl } from "./utils";
import { useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          navigate("/login");
          return;
        }

        const response = await fetch(`${APIUrl}/auth/verify`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
