import React, { useState } from "react";
//icon
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  //toggle navbar for phone
  const [toggle, setToggle] = useState(false)
  const swapnav = () => {
    setToggle(!toggle)

  }

  //menu style
  const menustyle = () => {
    return "hover:cursor-pointer underline-animation toleft"
  }
  return (
    <>
      {/* คอม */}
      <nav className="hidden container mx-auto font-light text-sm md:flex justify-between items-center py-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl mr-10">Leaf & Sip</h1>
          <ul className="flex gap-10">
            <li className={menustyle()}>
              Shop
            </li>
            <li className={menustyle()}>
              Contact us
            </li>
            <li className={menustyle()}>
              Learn more
            </li>
            <li className={menustyle()}>
              Search
            </li>
            <li className={menustyle()}>
              Our team
            </li>
          </ul>
        </div>

        <ul className="flex gap-8 items-center">
          <li className={menustyle()}>
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
      {/* มือถือ */}
      <nav className="md:hidden p-3 flex items-center justify-between">
        <h1 className="font-bold text-2xl cursor-pointer">Leaf & Sip  </h1>
        <h1 onClick={swapnav} className="text-2xl cursor-pointer"><RxHamburgerMenu /></h1>
      </nav>

      <nav className={`md:hidden transition-all duration-500 ease-in-out  ${toggle ? 'px-5 py-3 max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-5'} overflow-hidden`}>
        <ul className="flex flex-col gap-3">
          <li className="text-xl">
            Shop
          </li>
          <li className="text-xl">
            Contact us
          </li>
          <li className="text-xl">
            Learn more
          </li>
          <li className="text-xl">
            Search
          </li>
          <li className="text-xl">
            Our team
          </li>
        </ul>
        <ul className={`flex flex-col gap-3  mt-3`}>

          <li className="text-xl">
            My account
          </li>
          <div className="flex gap-5">
            <li className="flex items-center text-3xl ">
              <CiUser />
            </li>
            <li className="flex items-center text-3xl ">
              <CiShoppingCart />
            </li>
          </div>

        </ul>
      </nav>
    </>
  );
};

export default Navbar;
