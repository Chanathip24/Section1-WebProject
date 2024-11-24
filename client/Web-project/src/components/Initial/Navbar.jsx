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
  //user data
  const [user, setUser] = useState(null);

  //fetch check credential
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/user/checklogin`
        );
        setUser(res.data);

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
      await axios.get(`${import.meta.env.VITE_API_ROUTE}/user/logout`);
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

  //total in cart
  const [totalProduct, setTotalProduct] = useState(0);
  useEffect(() => {
    const findTotalProduct = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setTotalProduct(cart.length);
      } catch (error) {
        console.error("Error reading cart:", error);
        setTotalProduct(0);
      }
    };
    findTotalProduct();
  }, []);
  return (
    <>
      {/* คอม */}
      <header className="sticky top-0 z-10 bg-white">
        <nav className="  hidden container mx-auto font-light text-sm lg:flex justify-between items-center py-2">
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
              <li className={menustyle()}>
                <NavLink
                  to="/aboutus"
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                >
                  About Us
                </NavLink>
              </li>
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
                {user?.role === "ADMIN" ? (
                  <li className={menustyle()}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "font-bold" : ""
                      }
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                <li onClick={userLogout} className={menustyle()}>
                  Sign out
                  
                </li>
              </>
            )}
            {!isLogin ? (
              <li className="flex items-center text-xl hover:cursor-pointer">
                <NavLink to="/login">
                  <CiUser />
                </NavLink>
              </li>
            ) : null}

            <li className="flex items-center text-xl hover:cursor-pointer ">
              <NavLink to="/cart" className="relative">
                <CiShoppingCart size={24} className="text-gray-700" />
                {totalProduct > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hover:animate-bounce">
                    {totalProduct}
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* มือถือ */}
        <nav className="sticky top-0 z-10 bg-white lg:hidden p-5 flex items-center justify-between">
          <h1 className="font-bold text-2xl cursor-pointer">
            <NavLink to="/">Leaf & Sip</NavLink>{" "}
          </h1>
          <div className="flex gap-5">
            {/* Cart */}
            <NavLink to="/cart" className="relative">
              <CiShoppingCart size={24} className="text-gray-700" />
              {totalProduct > 0 ? (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hover:animate-bounce">
                  {totalProduct}
                </span>
              ) : (
                ""
              )}
            </NavLink>
            {toggle ? (
              <h1 onClick={swapnav} className="text-2xl cursor-pointer">
                <IoClose />
              </h1>
            ) : (
              <h1 onClick={swapnav} className="text-2xl cursor-pointer">
                <RxHamburgerMenu />
              </h1>
            )}
          </div>
        </nav>
      </header>

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

          <NavLink
            to="/contactus"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            <li className="text-xl">Contact us</li>
          </NavLink>

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
          <NavLink
            to="/aboutus"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            <li className="text-xl">About us</li>
          </NavLink>
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
              </div>
            </>
          ) : (
            <>
            {user?.role === "ADMIN" ? <li className={`text-xl `}>
                <NavLink
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li> : ""}
              
              <li onClick={userLogout} className="text-xl cursor-pointer">
                Sign out
                
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
