import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

//icon
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  //allow cookie
  axios.defaults.withCredentials = true;
  //check already login?
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:8081/user/checklogin");

        setLogin(true);
      } catch (error) {
        setLogin(false);
      }
    };
    checkLogin();
  }, []);
  //logout
  const userLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8081/user/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  //toggle navbar for phone
  const [toggle, setToggle] = useState(false);
  const swapnav = () => {
    setToggle(!toggle);
  };

  //menu style
  const menustyle = () => {
    return "hover:cursor-pointer underline-animation toleft focus:outline-none";
  };
  return (
    <header>
      {/* คอม */}
      <nav className="sticky top-0 z-10 bg-white hidden container mx-auto font-light text-sm lg:flex justify-between items-center py-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl mr-10">
            <NavLink to="/">Leaf & Sip</NavLink>
          </h1>
          <ul className="flex gap-10">
            <li className={menustyle()}>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Shop
              </NavLink>
            </li>
            <li className={menustyle()}>
              <NavLink
                to="/contactus"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Contact us
              </NavLink>
            </li>
            <li className={menustyle()}>
              <NavLink
                to="/learnmore"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Learn more
              </NavLink>
            </li>
            <li className={menustyle()}>
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Search
              </NavLink>
            </li>
            <NavLink
              to="/aboutus"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              <li className={menustyle()}>About Us</li>
            </NavLink>
          </ul>
        </div>

        <ul className="flex gap-8 items-center">
          {isLogin === false ? (
            <li className={menustyle()}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-bold" : "")}
                to="/login"
              >
                My account
              </NavLink>
            </li>
          ) : (
            <>
              <li className={menustyle()}>
                <NavLink
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li onClick={userLogout} className={menustyle()}>
                ออกจากระบบ
              </li>
            </>
          )}
          <li className="flex items-center text-xl hover:cursor-pointer">
            <CiUser />
          </li>
          <li className="flex items-center text-xl hover:cursor-pointer ">
            <CiShoppingCart />
          </li>
        </ul>
      </nav>

      {/* มือถือ */}
      <nav className="sticky top-0 z-10 bg-white lg:hidden p-5 flex items-center justify-between">
        <h1 className="font-bold text-2xl cursor-pointer">
          <NavLink to="/">Leaf & Sip</NavLink>{" "}
        </h1>

        {toggle ? (
          <h1 onClick={swapnav} className="text-2xl cursor-pointer">
            <IoClose />
          </h1>
        ) : (
          <h1 onClick={swapnav} className="text-2xl cursor-pointer">
            <RxHamburgerMenu />
          </h1>
        )}
      </nav>

      <nav
        className={`sticky top-14 bg-white z-10 lg:hidden transition-all duration-500 ease-in-out  ${
          toggle
            ? "px-5 py-3 max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-5"
        } overflow-hidden`}
      >
        <ul className="flex flex-col gap-3">
          <li className="text-xl">
            <NavLink
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to="/shop"
            >
              Shop
            </NavLink>
          </li>

          <li className="text-xl">Contact us</li>
          <NavLink
            to="/learnmore"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            <li className="text-xl">Learn more</li>
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            <li className="text-xl">Search</li>
          </NavLink>
          <li className="text-xl">Our team</li>
        </ul>
        <ul className={`flex flex-col gap-3  mt-3`}>
          {isLogin === false ? (
            <>
              <li className={`text-xl `}>
                <NavLink
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                  to="/login"
                >
                  My account
                </NavLink>
              </li>
              <div className="flex gap-5">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                >
                  <li className="flex items-center text-3xl ">
                    <CiUser />
                  </li>
                </NavLink>
                {/* Cart */}
                <li className="relative flex items-center text-3xl ">
                  <div className="absolute animate-pulse top-0 -right-1 rounded-full border p-2 border-red-500 bg-red-500"></div>
                  <CiShoppingCart />
                </li>
              </div>
            </>
          ) : (
            <>
              <li className={`text-xl `}>
                <NavLink
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li onClick={userLogout} className="text-xl cursor-pointer">
                ออกจากระบบ
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
