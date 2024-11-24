import React, { useEffect, useState } from "react";
import axios from "axios";
//component
import Navbar from "../components/Initial/Navbar";
import Footer from "../components/Initial/Footer";
import Announcement from "../components/Initial/Announcement";
import LoginForm from "../components/Initial/LoginForm";
import RegisterForm from "../components/Initial/RegisterForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
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
  //if login
  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin]);

  //navstatus
  const [index, setIndex] = useState(2);
  //change nav
  const changenav = (n) => {
    setIndex(n);
  };
  //navstyle
  const navstyle = (n) => {
    return `${
      n === index ? "border-black" : "border-gray-300"
    } p-2 border-b-[1.5px]  w-1/2`;
  };
  return (
    <>
      <Announcement />
      <Navbar />
      <main>
        <section className="mx-auto p-10 md:p-0 my-5 gap-8 lg:gap-0 lg:my-16 container grid grid-cols-1  md:grid-cols-2 place-items-center">
          <img
            src="https://resourceboy.com/wp-content/uploads/2023/06/front-view-of-beverage-bottle-mockup.jpg"
            alt="A picture of beverages"
            className="order-2 lg:-order-1"
          />
          <section className="flex justify-center flex-col items-center">
            <div className="flex w-full">
              <button onClick={() => changenav(1)} className={navstyle(1)}>
                Join now
              </button>
              <button onClick={() => changenav(2)} className={navstyle(2)}>
                Log in
              </button>
            </div>
            <h1 className="mt-4 font-bold tracking-wider text-2xl">
              15% discount for new customer
            </h1>
            <p className="mt-2 ">
              Join our community for free and get 15% discount.
            </p>
            {index === 2 ? <LoginForm /> : <RegisterForm />}
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Login;
