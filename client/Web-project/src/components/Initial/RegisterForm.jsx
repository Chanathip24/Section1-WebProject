import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Base input style remains the same
  const getInputStyle = (fieldName) => {
    return `p-2 focus:outline-none text-[16px] rounded-md border ${
      errors[fieldName] ? 'border-red-500' : 'border-gray-900'
    } resize-none`;
  };

  //user data
  const [data, setData] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  //validate form
  const validateForm = () => {
    const newErrors = {};

    if (!data.fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!data.lname.trim()) {
      newErrors.lname = "Last name is required";
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!data.address.trim()) {
      newErrors.address = "Address is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please check the highlighted fields");
      return false;
    }

    return true;
  };

  //handleform
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate first
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8081/user/register", data);
      toast.success(res.data);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="flex gap-3 w-full flex-col mt-4">
        <label htmlFor="fname">First name</label>
        <input
          onChange={handleChange}
          type="text"
          name="fname"
          id="fname"
          placeholder="First name"
          className={getInputStyle("fname")}
          required
        />
        {errors.fname && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.fname}</span>
        )}

        <label htmlFor="fname">Last name</label>
        <input
          onChange={handleChange}
          type="text"
          name="lname"
          id="lname"
          placeholder="Last name"
          className={getInputStyle("lname")}
          required
        />
        {errors.lname && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.lname}</span>
        )}

        <label htmlFor="pnum">Phone number</label>
        <input
          onChange={handleChange}
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone number"
          className={getInputStyle("phone")}
          required
        />
        {errors.phone && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.phone}</span>
        )}

        <label htmlFor="address">Address</label>
        <textarea
          onChange={handleChange}
          name="address"
          placeholder="Address"
          required
          className={getInputStyle("address")}
        ></textarea>
        {errors.address && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.address}</span>
        )}

        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className={getInputStyle("email")}
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.email}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className={getInputStyle("password")}
          placeholder="Password"
          required
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-[-8px]">{errors.password}</span>
        )}

        <p className="underline text-gray-600 font-thin">FORGOT PASSWORD</p>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`p-2 border border-black bg-black text-white rounded-lg hover:bg-transparent hover:text-black transition duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;