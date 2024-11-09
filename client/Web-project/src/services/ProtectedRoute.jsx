import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Initial/Loading";

const ProtectedRoute = ({ role, children }) => {
  const navigate = useNavigate();
  const [isPass, setPass] = useState(null); 
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:8081/user/checklogin");
      
        if (res.status === 200 && res.data.role === role ) {
          setPass(true); 
        } else {
          setPass(false); 
        }
      } catch (error) {
        setPass(false); 
      }
    };

    checkLogin();
  }, []);

  
  useEffect(() => {
    if (isPass === false) {
      navigate("/login"); 
    }
  }, [isPass, navigate]);

  if (isPass === null) {
    return <Loading/>; 
  }

  return isPass ? children : null; 
};

export default ProtectedRoute;
