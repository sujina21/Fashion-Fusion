import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TestPage() {
  const [retrievedData, setRetrievedData] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("access-token")}`,
    },
  };

  async function getProtectedData() {
    try {
      const res = await fetch("http://localhost:3000/data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token",
          )}`,
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Not allowed");
      }
      const data = await res.json();
      console.log(data);
      setRetrievedData(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response);
      }
      console.log(e);
      navigate("/login");
    }
  }
  useEffect(() => {
    getProtectedData();
  }, []);

  return <div>{retrievedData}</div>;
}

export default TestPage;
