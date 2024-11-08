import React from "react";
import { Link } from "react-router-dom";
const DashTitleHead = ({ title, total, url }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-gray-400">{total} items found</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="focus:outline-none p-2 border border-gray-200 rounded-lg"
            placeholder="Search.."
          />
          <Link to={url}>
            <button className="py-2 px-5 hover:bg-blue-500 transition text-white bg-blue-400 rounded-lg">
              Create item
            </button>
          </Link>
        </div>
      </div>
      <hr className="my-5" />
    </>
  );
};

export default DashTitleHead;