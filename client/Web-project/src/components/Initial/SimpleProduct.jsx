import React, { useState } from "react";
import Items from "./ProductCard";

const SimpleProduct = () => {
  //active
  const [isActive, setActive] = useState(1);
  //button style
  const buttonstyle = (index) => {
    return `${
      isActive === index ? "border-black" : "border-gray-300"
    } transition px-5 py-1 border  rounded-lg`;
  };
  //set active
  const setbutton = (index) => {
    setActive(index);
  };

  //carousel branding
  const little = "w-max rounded text-black px-2 text-sm";
  return (
    <>
      <section className="container mx-auto mt-8">
        <div className="flex p-2 gap-x-8 gap-y-3 flex-wrap">
          <button onClick={() => setbutton(1)} className={buttonstyle(1)}>
            Tea
          </button>
          <button onClick={() => setbutton(2)} className={buttonstyle(2)}>
            Juices
          </button>
          <button onClick={() => setbutton(3)} className={buttonstyle(3)}>
            Healthy
          </button>
          <button onClick={() => setbutton(4)} className={buttonstyle(4)}>
            Alcoholic
          </button>
        </div>

        <div className="grid grid-cols-1 overflow-hidden place-items-center lg:grid-cols-2 mt-4 ">
          <div className="relative  w-full cursor-pointer rounded-lg">
            <div className="gradient  absolute bottom-0 left-0 w-full h-full rounded-lg text-white flex justify-end flex-col p-8 gap-3">
              <h1 className="text-3xl font-bold tracking-wider">
                For your daily hydration
              </h1>
              <div className="flex flex-wrap gap-3">
                <p className={little} style={{ backgroundColor: "#BCF997" }}>
                  VITAMIN
                </p>
                <p className={little} style={{ backgroundColor: "#BCF997" }}>
                  MANY FLAVORS
                </p>
                <p className={little} style={{ backgroundColor: "#BCF997" }}>
                  TASTY
                </p>
                <p className={little} style={{ backgroundColor: "#BCF997" }}>
                  SUSTAINABLE
                </p>
              </div>
            </div>
            <img
              src="https://cdn.shopify.com/s/files/1/0274/4988/4706/files/BLACKBERRY-HOME-Slider-D.jpg?v=1712180524"
              alt=""
              className="rounded-lg object-cover h-[300px] md:h-auto"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row justify-center md:gap-10">
            <Items />
            <Items />
          </div>
        </div>
      </section>
      <hr className="container mx-auto my-16" />
    </>
  );
};

export default SimpleProduct;
