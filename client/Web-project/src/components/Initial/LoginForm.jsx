import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  axios.defaults.withCredentials = true;
  //navigate
  const navigate = useNavigate();
  //user object
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/user/login", user);
      
      if (res.status === 200) return navigate("/");
    } catch (error) {
      const message = error.response.data
      toast.error(message)
    }
  };
  const inputstyle =
    "p-2 focus:outline-none text-[16px] rounded-md border border-gray-900";

  return (
    <>
      <Toaster />
      <form className="flex gap-3 w-full flex-col mt-4">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          className={inputstyle}
          onChange={handlechange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={inputstyle}
          placeholder="Password"
          onChange={handlechange}
        />
        <p className="underline text-gray-600 font-thin">FORGOT PASSWORD</p>
        <button
          onClick={onsubmit}
          className="p-2 border border-black bg-black text-white rounded-lg hover:bg-transparent hover:text-black transition duration-300"
        >
          LOGIN
        </button>
      </form>
    </>
  );
};

export default LoginForm;
