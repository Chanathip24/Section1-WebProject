import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//component
import Dashnav from "./components/Dashnav";
import DashEditHead from "./components/DashEditHead";
const DashAddUsers = () => {
  //checkclick
  const [isClick, setClick] = useState(false);
  //navigation
  const navigate = useNavigate();
  //inputstyle
  const inputstyle =
    "p-3 border focus:outline-none border-gray-400 rounded-lg resize-none";

  //user
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    role: "CUSTOMER",
    address: "",
  });

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
        return value.length < 2  ? "Must be at least 2 characters" : "";
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

  //handlechange
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    //check error
    const error = validateError(e.target.name, e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: error }));
  };
  //submit
  const handlesubmit = async (e) => {
    //stop default
    e.preventDefault();
    
    //checking click first
    if (isClick) return toast.error("Wait! you are click too fast");

    // Validate all fields before submission
    const newErrors = {};
    let hasErrors = false;
    
    Object.keys(user).forEach((key) => {
      if (key !== "role") {
        const error = validateError(key, user[key]);
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        }
      }
    })
    if (hasErrors) {
      toast.error("Please fix all errors before submitting");
      setErrors(newErrors);
      
      return;
    }
    //logic insert data to db
    try {
      setClick(true);
      await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/user/registeradmin`,
        user
      );
      toast.success("Create user successfully");
      //redirect
      setTimeout(() => {
        navigate("/dashboard/users");
      }, 3000);
    } catch (error) {
      setClick(true);
      if(error.response?.data?.msg) return toast.error(error.response?.data?.msg)
      toast.error("Create user failed");
    } finally {
      setTimeout(() => {
        setClick(false);
      }, 1200);
    }
  };
  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Toaster />
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-white">
        <DashEditHead title={"Create User"} url={"/dashboard/users"} />
        <form className="flex gap-2 flex-col w-1/2">
          <label>First name</label>
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

          <label>Last name</label>
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

          <label>Phone number</label>
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

          <label>Email</label>
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

          <label>Role</label>
          <select onChange={handlechange} name="role" className={inputstyle}>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <label>Address</label>
          <textarea
            onChange={handlechange}
            type="text"
            placeholder="Address"
            name="address"
            className={inputstyle}
          />

          <button
            type="submit"
            onClick={handlesubmit}
            className="p-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white mt-3 w-1/4"
          >
            CREATE
          </button>
        </form>
      </section>
    </section>
  );
};

export default DashAddUsers;
