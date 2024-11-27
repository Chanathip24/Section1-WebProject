import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//hook
import useFetchData from "../../hooks/useFetchData";

//component
import Dashnav from "./components/Dashnav";
import DashEditHead from "./components/DashEditHead";

import Loading from "../Initial/Loading";

const DashEditUser = () => {
  //navigation
  const navigate = useNavigate();
  //user id from param
  const { id } = useParams();
  //user data before
  const { data, loading, error } = useFetchData(
    `${import.meta.env.VITE_API_ROUTE}/user/getuser/${id}`
  );

  //user
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    address: "",
  });
  //checkclick
  const [isClick, setClick] = useState(false);

  // Add errors state
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const validateError = (name, value) => {
    switch (name) {
      case "fname":
      case "lname":
        return value.length < 2 ? "Must be at least 2 characters" : "";
      case "phone":
        return !/^\+?[\d\s-]{10,}$/.test(value)
          ? "Please enter a valid phone number"
          : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email"
          : "";
      case "password":
        return value.length < 6 ? "Password must be at least 6 characters" : "";
      default:
        return "";
    }
  };

  //handleupdate
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isClick) return toast.error("You're click too fast");

    //before update user validation first
    const newError = {};
    let isError = false;
    Object.keys(user).forEach((key) => {
      //ไม่ต้องเช็คทุกแถวเพราะไม่ได้อัพเดททุกแถว
      if(user[key] === ""){
        return;
      }
      const error = validateError(key, user[key]);
      if (error) {
        newError[key] = error;
        isError = true;
      }
    });
    if (isError) {
      toast.error("Please fix all errors.");
      setErrors(newError);
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_ROUTE}/user/updateuser/${id}`,
        user
      );
      setClick(true);
      toast.success(res.data);
      setTimeout(() => {
        navigate("/dashboard/users");
      }, 1500);

    } catch (error) {
      setClick(true);
      console.log(error);
      toast.error(`Something error please read the log or contact administrator.`);
      setTimeout(() => {
        setClick(false);
      }, 2000);
    }
  };

  //inputstyle
  const inputstyle =
    "p-3 border focus:outline-none border-gray-400 rounded-lg resize-none";

  //handlechange on form
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    //error validate kub
    const error = validateError(e.target.name, e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: error }));
  };


  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Toaster />
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-white">
        {/* title head */}
        <DashEditHead title={"Edit User"} url={"/dashboard/users"} />

        <form className="flex gap-2 flex-col w-1/2">
          <label>First name : {data?.fname}</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="First name"
            name="fname"
            className={`${inputstyle} ${
              errors.fname ? "border border-red-500" : ""
            }`}
          />
          <span className="text-red-600">{errors?.fname}</span>

          <label>Last name : {data?.lname}</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="Last name"
            name="lname"
            className={`${inputstyle} ${
              errors.lname ? "border border-red-500" : ""
            }`}
          />
          <span className="text-red-600">{errors?.lname}</span>

          <label>Phone number : {data?.phone}</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="Phone number"
            name="phone"
            className={`${inputstyle} ${
              errors.phone ? "border border-red-500" : ""
            }`}
          />
          <span className="text-red-600">{errors?.phone}</span>

          <label>Email {data?.email}</label>
          <input
            onChange={handlechange}
            type="email"
            placeholder="Email"
            name="email"
            className={`${inputstyle} ${
              errors.email ? "border border-red-500" : ""
            }`}
          />
          <span className="text-red-600">{errors?.email}</span>

          <label>Password</label>
          <input
            onChange={handlechange}
            type="password"
            placeholder="Password"
            name="password"
            className={`${inputstyle} ${
              errors.password ? "border border-red-500" : ""
            }`}
          />
          <span className="text-red-600">{errors?.password}</span>

          <label>Role : {data ? data.role : ""}</label>
          <select
            onChange={handlechange}
            type="text"
            placeholder="First name"
            name="role"
            className={inputstyle}
          >
            <option value=""></option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <label>Address : {data?.address}</label>
          <textarea
            onChange={handlechange}
            type="text"
            placeholder="Address"
            name="address"
            className={inputstyle}
          />

          <button
            type="submit"
            onClick={handleUpdate}
            className="p-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white mt-3 w-1/4"
          >
            CREATE
          </button>
        </form>
      </section>
    </section>
  );
};

export default DashEditUser;
