import React from "react";

const RegisterForm = () => {
  const inputstyle =
    "p-2 focus:outline-none text-[16px] rounded-md border border-gray-900 resize-none";

  return (
    <>
      <form className="flex gap-3 w-full flex-col mt-4">
        <label htmlFor="fname">First name</label>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="First name"
          className={inputstyle}
        />

        <label htmlFor="fname">Last name</label>
        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Last name"
          className={inputstyle}
        />

        <label htmlFor="pnum">Phone number</label>
        <input
          type="text"
          name="pnumber"
          id="pnumber"
          placeholder="Phone number"
          className={inputstyle}
        />
        <label htmlFor="address">Address</label>
        <textarea name="address" placeholder="Address" className={inputstyle}></textarea>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          className={inputstyle}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={inputstyle}
          placeholder="Password"
        />
        <p className="underline text-gray-600 font-thin">FORGOT PASSWORD</p>
        <button className="p-2 border border-black bg-black text-white rounded-lg hover:bg-transparent hover:text-black transition duration-300">
          LOGIN
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
