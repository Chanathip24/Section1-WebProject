import React from "react";

const Dashcate = () => {
    //menu style
    const listyle = "py-2 px-5 rounded-2xl cursor-pointer transition duration-300 hover:bg-gray-300"
  return (
    <section className="flex justify-between items-center">
      <ul className="flex gap-3">
        <li className="py-2 px-5 rounded-2xl cursor-pointer transition duration-300 hover:bg-gray-300 bg-gray-300">All products</li>
        <li className={listyle}>Most purchase</li>
        <li className={listyle}>Beverages</li>
        <li className={listyle}>Accessory</li>
        <li className={listyle}>Bottles</li>
      </ul>
      <select className="p-2 focus:outline-none rounded-lg" name="" id="">
        <option value="">Sort By</option>
      </select>
    </section>
  );
};

export default Dashcate;
