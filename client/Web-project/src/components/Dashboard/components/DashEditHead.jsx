import React from "react";
import { Link } from "react-router-dom";
//icon
import { MdKeyboardArrowLeft } from "react-icons/md";
const DashEditHead = ({ title, url }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex gap-3">
          <Link to={url}>
            <button className="py-3 px-5  transition border hover:bg-black hover:text-white border-black text-black rounded-lg flex items-center gap-3">
              <span className="text-2xl">
                <MdKeyboardArrowLeft />
              </span>{" "}
              Go back
            </button>
          </Link>
        </div>
      </div>
      <hr className="my-5" />
    </>
  );
};

export default DashEditHead;
