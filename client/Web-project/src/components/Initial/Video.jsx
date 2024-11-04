import React from "react";

const Video = () => {
  return (
    <>
      {/*sec1*/}
      {/* IMAGE */}
      <section className=" mb-16 flex justify-center items-center">
        <figure className="flex flex-col md:flex-row items-center gap-5 w-3/4">
          {/* Image placeholder */}
          <div className=" bg-gray-300 w-full md:w-1/2  h-64 flex justify-center items-center">
            <span>IMG</span>
          </div>
          {/* Text1 */}
          <figcaption className="w-full md:w-1/2">
            <p className="text-gray-500 italic mb-2">
              “ From Humble Beginnings to Refreshing the World ”
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Flavors that awaken you.
            </h1>
            <p className="text-gray-700">
              It all started with a passion for creating beverages that combine
              taste, health, and refreshment. Back in 2024, we began as a small,
              local shop dedicated to crafting unique flavors using the finest
              natural ingredients. Our founder, Leaf & Sip, wanted to share
              their love for refreshing drinks with the community, and it wasn't
              long before word spread about our delicious beverages.
            </p>
          </figcaption>
        </figure>
      </section>

      {/*sec2*/}
      {/* Text2 */}
      <section className="bg-white py-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="text-sm font-thin text-gray-700 uppercase mb-4">
          Our Product
        </h1>
        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          5000+ plastic bottles saved
        </h3>
        {/* Video placeholder */}
        <figure className="flex  w-full h-64 justify-center items-center  ">
          <div className="bg-gray-300 w-full md:w-1/2 h-64 flex justify-center items-center">
            <span className="text-gray-500">VIDEO</span>
          </div>
        </figure>
      </section>
    </>
  );
};

export default Video;
