import React, { useContext, useState } from "react";
import api from "../api/api";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

type UserFormData = {
  email: string;
  password: string;
};

function useAuthentication() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const loginUrl = async (userData: UserFormData) => {
    try {
      const res = await api.post("/user/authenticate", userData);
      const token = res.data.token;
      window.localStorage.setItem("access-token", token);
      console.log(res.data);
      userContext?.setAuthenticationStatus(true);
      userContext?.setUserRole(res.data.role);
      navigate("/home");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response);
      }

      userContext?.setAuthenticationStatus(false);
    }
  };
  return { loginUrl };
}

export default useAuthentication;
