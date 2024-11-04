import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//component
import Dashnav from "./components/Dashnav";
import DashEditHead from "./components/DashEditHead";
const DashEditUser = () => {
  //navigation
  const navigate = useNavigate();
  //user id from param
  const { id } = useParams();
  //before data
  const [data, setData] = useState(null);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/user/getuser/" + id);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //handleupdate
  const handleUpdate = async (e) => {
    e.preventDefault();
    if(isClick) return toast.error("You're click too fast")
    try {
      const res = await axios.put(
        `http://localhost:8081/user/updateuser/${id}`,
        user
      );
      setClick(true)
      toast.success(res.data)
      setTimeout(() => {
        navigate('/dashboard/users')
      }, 1500);
    } catch (error) {
      setClick(true)
      console.log(error);
      setTimeout(() => {
        setClick(false)
      }, 2000);
      
    }
  };

  //inputstyle
  const inputstyle =
    "p-3 border focus:outline-none border-gray-400 rounded-lg resize-none";

  //handlechange
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
      <Toaster />
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
        {/* title head */}
        <DashEditHead title={"Edit User"} url={"/dashboard/users"} />

        <form className="flex gap-2 flex-col w-1/2">
          <label>First name : {data ? data.fname : ""}</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="First name"
            name="fname"
            className={inputstyle}
          />

          <label>Last name : {data ? data.lname : ""}</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="Last name"
            name="lname"
            className={inputstyle}
          />

          <label>Phone number : {data ? data.phone : ""}</label>
          <input
            onChange={handlechange}
            type="text"
            placeholder="Phone number"
            name="phone"
            className={inputstyle}
          />

          <label>Email {data ? data.email : ""}</label>
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

          <label>Address : {data ? data.address : ""}</label>
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
