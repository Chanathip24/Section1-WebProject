import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPCHA from "react-google-recaptcha";
const LoginForm = () => {
  axios.defaults.withCredentials = true;

  //recaptcha
  const recaptchaRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);
  const SITE_KEY = "6Lefv4gqAAAAALAttneODeYFTvcdz8No5Kh5OxYB"; //recaptCHA SITE_KEY

  const handleRecaptchaChange = async (token) => {
    if (token) {
      setIsVerified(true);
      const newToken = await recaptchaRef.current.getValue();
      setUser((prev) => ({ ...prev, recaptchaToken: newToken }));
    } else {
      setIsVerified(false);
      toast.error("reCAPTCHA verification expired. Please try again.");
    }
  };

  //navigate
  const navigate = useNavigate();

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //errors state
  const [errors, setErrors] = useState({});

  //user object
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getInputStyle = (fieldName) => {
    return `p-2 focus:outline-none text-[16px] rounded-md border ${
      errors[fieldName] ? "border-red-500" : "border-gray-900"
    }`;
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    if (!isVerified) {
      toast.error("Please verify that you are human!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/user/login`,
        user
      );

      if (res.status === 200) {
        toast.success("Login successful!");
        return navigate("/");
      }
    } catch (error) {
      const message = error.response?.data.msg || "Login failed";
      toast.error(message);

      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setIsVerified(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          className={getInputStyle("email")}
          onChange={handlechange}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.email}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={getInputStyle("password")}
          placeholder="Password"
          onChange={handlechange}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-[-8px]">
            {errors.password}
          </span>
        )}
        {/* RecaptCha */}
        <ReCAPCHA
          ref={recaptchaRef}
          onChange={handleRecaptchaChange}
          sitekey={SITE_KEY}
        />
        <p className="underline text-gray-600 font-thin">FORGOT PASSWORD</p>
        <button
          onClick={onsubmit}
          disabled={isLoading}
          className={`p-2 border border-black bg-black text-white rounded-lg hover:bg-transparent hover:text-black transition duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
