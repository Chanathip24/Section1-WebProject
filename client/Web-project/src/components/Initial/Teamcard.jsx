import React from "react";

//icon
import { FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
const Teamcard = ({ data }) => {
  return (
    <article className="w-60 h-96 relative">

     
      <div id="socialCard" className="p-5 gap-5 ">
        <a href={data?.github}>
          {" "}
          <FaGithub
            className="cursor-pointer transition-all hover:text-white hover:animate-bounce"
            size={40}
          />
        </a>
        <a
          href={data?.ig}
        >
          <FaSquareInstagram
            className="cursor-pointer transition-all hover:text-white hover:animate-bounce"
            size={40}
          />
        </a>
      </div>
      <div className="bg-stone-300 h-[85%]  border ">
        <img
          className="object-cover h-full w-full"
          src={data?.img}
          alt={`Image of our team member his/her name is ${data?.name}`}
        />
      </div>
      <h3 className="font-bold mt-3">{data?.name}</h3>
      <p className="font-extralight">{data?.position}</p>
    </article>
  );
};

export default Teamcard;
