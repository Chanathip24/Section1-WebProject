import React from "react";
import { Link } from "react-router-dom";
const DashPDcard = () => {
  return (
    <article className="rounded-2xl p-4 border border-gray-300 mt-5">
      <div className="relative rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
          className="rounded-2xl"
          width={200}
          alt=""
        />
        <div className="px-3 py-1 bg-blue-300 absolute top-0 right-0 rounded-lg mr-2 mt-2">
          <p>Category</p>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <div className="w-2/4 overflow-hidden ">
          <h1 className="truncate text-ellipsis">Product name</h1>
          <p>฿1,000</p>
        </div>
        <div>
          <p>
            <span className="text-gray-400">Stock</span> 500
          </p>
          <p>
            <span className="text-gray-400">Sold</span> 768
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Link to='/dashboard/products/editproducts'>
          <button className="py-1 px-3 bg-blue-500 rounded-lg text-white">
            Edit
          </button>
        </Link>

        <button className="py-1 px-3 bg-red-500 rounded-lg text-white">
          Delete
        </button>
      </div>
    </article>
  );
};

export default DashPDcard;
