import React from "react";
//icon
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
const Navbar = () => {
  return (
    <>
      <nav className="container mx-auto font-light text-sm flex justify-between items-center py-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl mr-10">Logo</h1>
          <ul className="flex gap-10">
            <li className="hover:cursor-pointer underline-animation toleft">
              Shop
            </li>
            <li className="hover:cursor-pointer underline-animation toleft">
              Contact us
            </li>
            <li className="hover:cursor-pointer underline-animation toleft">
              Learn more
            </li>
            <li className="hover:cursor-pointer underline-animation toleft">
              Search
            </li>
            <li className="hover:cursor-pointer underline-animation toleft">
              Our team
            </li>
          </ul>
        </div>

        <ul className="flex gap-8 items-center">
          <li className="hover:cursor-pointer underline-animation toleft">
            My account
          </li>
          <li className="flex items-center text-xl hover:cursor-pointer">
            <CiUser />
          </li>
          <li className="flex items-center text-xl hover:cursor-pointer ">
            <CiShoppingCart />
          </li>
        </ul>
      </nav>

    </>
  );
};

export default Navbar;
