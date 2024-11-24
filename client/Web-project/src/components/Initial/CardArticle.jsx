import React from "react";
import { FaGlobeAfrica } from "react-icons/fa";
const CardArticle = ({data}) => {
  return (
    <article className="hover:drop-shadow-xl transition-all text-center w-full md:w-1/4 p-4 bg-white rounded-xl hover:scale-105 ">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="h-24 w-24 flex items-center justify-center rounded-full">
          <FaGlobeAfrica size={40}/>
        </div>
      </div>
      {/* Title */}
      <h2 className="text-xl font-bold mb-2">{data?.title}</h2>
      {/* Des */}
      <p className="text-gray-600">
        {data?.data}
      </p>
    </article>
  );
};

export default CardArticle;
