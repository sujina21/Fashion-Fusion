import { useState } from "react";
import api from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserData = {
  username: string;
  email: string;
  password: string;
  phone_number:string;
};

function useSignup() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const addUser = async (user: UserData) => {
    console.log(user);
    try {
      const res = await api.post("/user/register", user);
      if (res.data) {
        setLoading(false);
        setMessage("Signed up successfully");
        navigate("/login");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setMessage(e.response?.data);
        console.log(e.response?.data);
      } else {
        console.log(e);
      }
      setError(true);
      setLoading(false);
    }
  };

  return { addUser, error, message, loading };
}

export default useSignup;
