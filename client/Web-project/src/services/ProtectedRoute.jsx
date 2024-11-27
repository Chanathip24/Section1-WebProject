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
        const res = await axios.get(`${import.meta.env.VITE_API_ROUTE}/user/checklogin`);
        
        if (res.status === 200 && role.includes(res.data.role)) {
          setPass(true); 
          
        } else {
          navigate('/login') 
          setPass(false); 
        }
      } catch (error) {
        setPass(false);
        navigate('/login') 
      }
    };

    checkLogin();
  }, []);


  if (isPass === null) {
    return <Loading/>; 
  }

  return isPass ? children : null; 
};

export default ProtectedRoute;
