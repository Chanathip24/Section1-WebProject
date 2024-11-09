import React from "react";
import {motion} from 'framer-motion'
const SubCarousel = () => {
  //animation
  const animation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
      },
    },
  };
  return (
    <motion.section variants={animation} initial="hidden" whileInView="visible" viewport={{once:true}} className="flex justify-center container mx-auto my-12">
      <div className="relative w-11/12 md:w-full h-500 md:h-1/2 rounded-xl overflow-hidden">
        <div className=" absolute flex flex-col top-0 w-full h-full md:p-0 justify-center items-center text-white gradient ">
          <h1 className="text-3xl md:text-4xl tracking-widest">
            FIND YOUR TASTE
          </h1>
          <p className="mt-5 ">FIND YOUR TASTE</p>
          <button className="mt-1 px-6 py-3 hover:bg-gray-800 hover:text-white duration-300 transition bg-white rounded-lg text-black">
            FIND YOUR TASTE
          </button>
        </div>
        <img
          className="rounded-lg h-500 md:h-1/2 w-full object-cover"
          src="https://www.waterdrop.com/cdn/shop/files/collection-header-desktop-raspberry_3000x_1_2400x.jpg?v=1719843428"
          alt="Find Your Taste"
        />
      </div>
    </motion.section>
  );
};

export default SubCarousel;
