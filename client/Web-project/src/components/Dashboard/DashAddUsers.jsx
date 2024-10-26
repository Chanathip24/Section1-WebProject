import React, { useState } from "react";
import axios from "axios";
//component
import Dashnav from "./components/Dashnav";
import { MdKeyboardArrowLeft } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  //handlechange
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //submit
  const handlesubmit = async (e) => {
    //stop default
    e.preventDefault();
    //checking click first
    if (isClick) return toast.error("Wait! you are click too fast");

    //logic insert data to db
    try {
      setClick(true);
      const res = await axios.post("http://localhost:8081/user/registeradmin", user);
      toast.success("Create user successfully")
      //redirect
      setTimeout(() => {
        navigate("/dashboard/users");
      }, 3000);
    } catch (error) {
      setClick(true);
      toast.error("Create user failed")
    } finally {
        setTimeout(()=>{
            setClick(false);
        },1200)
      
    }
  };
  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
      <Toaster />
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
        <DashEditHead title={"Create User"} url={"/dashboard/users"}/>
        <form className="flex gap-2 flex-col w-1/2">
          <label>First name</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="First name"
            name="fname"
            className={inputstyle}
          />

          <label>Last name</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="Last name"
            name="lname"
            className={inputstyle}
          />

          <label>Phone number</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="Phone number"
            name="phone"
            className={inputstyle}
          />

          <label>Email</label>
          <input
            onChange={handlechange}
            type="email"
            placeholder="Email"
            name="email"
            className={inputstyle}
          />

          <label>Password</label>
          <input
            onChange={handlechange}
            type="password"
            placeholder="Password"
            name="password"
            className={inputstyle}
          />

          <label>Role</label>
          <select
            onChange={handlechange}
            type="text"
            placeholder="First name"
            name="role"
            className={inputstyle}
          >
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
