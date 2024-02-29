import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { isAxiosError } from "axios";

export const UserContext = createContext<UserContextData | null>(null);

type Props = {
  children: React.ReactNode;
};

type UserContextData = {
  isAuth: boolean;
  setAuthenticationStatus: (data: boolean) => void;
  role: string;
  token: string;
  logoutUser: () => void;
  setUserRole: (data: string) => void;
  setToken: (data: string) => void;
};

export default function UserContextProvider({ children }: Props) {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");

  function logoutUser() {
    setIsAuth(false);
    setUserRole("");
    setToken("");
    window.localStorage.removeItem("access-token");
    navigate("/home");
  }

  async function validateToken(token: string) {
    try {
      const res = await api.post(
        "/api/validate-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.data;
      setIsAuth(true);
      setUserRole(data.authority);
      setToken(token);
      console.log(data.authority);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e.response);
      }
      setIsAuth(false);
      setUserRole("");
      setToken("");
      window.localStorage.removeItem("access-token");
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem("access-token");
    if (!token) {
      return;
    }
    validateToken(token);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuth: isAuth,
        setAuthenticationStatus: setIsAuth,
        role: userRole,
        token: token,
        logoutUser: logoutUser,
        setUserRole: setUserRole,
        setToken: setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
