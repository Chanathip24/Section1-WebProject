import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//icon
import { AiOutlineGlobal } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoExitOutline } from "react-icons/io5";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Dashnav = () => {
  //mobile nav status
  const [isOpen, setOpen] = useState(false);
  const navToggle = () => {
    setOpen(!isOpen);
  };
  //navigation
  const navigate = useNavigate();
  //menu style
  const listyle = (isActive) => `
  hover:bg-blue-800 hover:text-white transition cursor-pointer rounded-lg flex items-center gap-2 p-3 
  ${isActive ? "bg-blue-800 text-white" : "bg-white text-gray-700"}
`;
  //logout
  const logout = async () => {
    const res = await axios.get("http://localhost:8081/user/logout");
    navigate("/");
  };

  return (
    <>
      {/* คอม */}
      <aside className="hidden lg:flex flex-col justify-between p-5">
        <div>
          <h1 className="text-center font-bold tracking-wide text-2xl ">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </h1>
          <ul className="mt-5 flex flex-col gap-2">
            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/products"
            >
              <AiOutlineProduct className="text-2xl text-blue-500" /> All
              product
            </NavLink>

            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/users"
            >
              <FaRegUserCircle className="text-2xl text-blue-500" /> Users
            </NavLink>
            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/category"
            >
              <RxHamburgerMenu className="text-2xl text-blue-500" /> Category
            </NavLink>

            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/orders"
            >
              <IoFolderOpenOutline className="text-2xl text-blue-500" /> Orders
            </NavLink>

            <NavLink className={({ isActive }) => listyle(isActive)} to="/">
              <AiOutlineGlobal className="text-2xl text-blue-500" /> Home Page
            </NavLink>
          </ul>
        </div>

        <li onClick={logout} className={listyle(false)}>
          <IoExitOutline className="text-2xl text-red-500" /> Logout
        </li>
      </aside>

      {/* มือถือ */}
      <nav className="z-10 bg-white p-4 sticky top-0 flex items-center justify-between lg:hidden">
        <h1 className="font-bold tracking-wide text-2xl ">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </h1>
        {isOpen ? (
          <IoClose
            onClick={navToggle}
            className="text-2xl cursor-pointer"
          />
        ) : (
          <RxHamburgerMenu
            onClick={navToggle}
            className="text-2xl cursor-pointer"
          />
        )}
      </nav>
      <aside
        className={`transition-all sticky top-14 duration-500 ease-in-out overflow-hidden  lg:hidden flex flex-col px-5 ${
          isOpen ? " opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
        }`}
 
      >
        <div>
          <ul className="mt-5 flex flex-col gap-2">
            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/products"
            >
              <AiOutlineProduct className="text-2xl text-blue-500" /> All
              product
            </NavLink>

            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/users"
            >
              <FaRegUserCircle className="text-2xl text-blue-500" /> Users
            </NavLink>
            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/category"
            >
              <RxHamburgerMenu className="text-2xl text-blue-500" /> Category
            </NavLink>

            <NavLink
              className={({ isActive }) => listyle(isActive)}
              to="/dashboard/orders"
            >
              <IoFolderOpenOutline className="text-2xl text-blue-500" /> Orders
            </NavLink>

            <NavLink className={({ isActive }) => listyle(isActive)} to="/">
              <AiOutlineGlobal className="text-2xl text-blue-500" /> Home Page
            </NavLink>
          </ul>
        </div>

        <li onClick={logout} className={listyle(false)}>
          <IoExitOutline className="text-2xl text-red-500" /> Logout
        </li>
      </aside>
    </>
  );
};

export default Dashnav;
