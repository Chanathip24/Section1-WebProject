import { useState } from "react";
import React from "react";

const DashProductForm = () => {
  //input style
  const inputstyle =
    "py-2.5 px-3 border focus:outline-none border-gray-400 rounded-lg";
  return (
    <>
      <div className="grid grid-cols-2 gap-x-10">
        <div className="border border-gray-400 rounded-lg py-10 px-12">
          <h1 className="font-bold text-2xl">Images</h1>
          {/* Images preview */}
          <div className="mt-5 w-full h-80 rounded-lg border border-black"></div>
          <div className="flex gap-3 mt-5">
            <div className="w-1/4 h-20 rounded-lg border border-black"></div>
            <div className="w-1/4 h-20 rounded-lg border border-black"></div>
            <div className="w-1/4 h-20 rounded-lg border border-black"></div>
          </div>
          <input className="mt-4" type="file" />
        </div>
        <div className="border border-gray-400 rounded-lg py-10 px-12">
          <form action="" className="flex gap-2 flex-col">
            <h1 className="font-bold text-2xl">Product Details</h1>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              className={inputstyle}
              placeholder="Product name..."
            />

            <label>Category</label>
            <select name="category" className={inputstyle} id="">
              <option value="">Juices</option>
            </select>

            <label htmlFor="">Sub Category</label>
            <select name="sub_cate" className={inputstyle} id="">
              <option value="">Healthy Drinks</option>
            </select>

            <label htmlFor="">Price</label>
            <input
              type="text"
              className={inputstyle}
              name="price"
              placeholder="Price.."
            />

            <label htmlFor="">Description</label>
            <textarea
              name="description"
              className={inputstyle}
              id=""
            ></textarea>

            <label htmlFor="">Stock Quantity</label>
            <input type="text" name="stock" className={inputstyle} id="" />
          </form>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="bg-blue-400 hover:bg-blue-500 transition px-5 py-2 rounded-lg text-white ">
          Publish
        </button>
      </div>
    </>
  );
};

export default DashProductForm;
