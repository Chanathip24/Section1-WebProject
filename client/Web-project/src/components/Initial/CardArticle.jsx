import React from "react";

const CardArticle = () => {
  return (
    <article className="text-center w-full md:w-1/4 p-4 bg-white rounded-lg ">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="border border-black h-24 w-24 flex items-center justify-center rounded-full">
          Circle
        </div>
      </div>
      {/* Title */}
      <h2 className="text-xl font-bold mb-2">Sustainability First</h2>
      {/* Des */}
      <p className="text-gray-600">
        We care about the planet as much as we care about our beverages.
      </p>
    </article>
  );
};

export default CardArticle;
