import React, { useState } from "react";
import { motion } from "framer-motion";
//component
import Items from "./ProductCard";

const   Topseller = ({ data }) => {
  //button active
  const [topseller, setTopseller] = useState(1);
  const changestatus = (index) => {
    setTopseller(index);
  };

  //button class
  const buttonclass = (index) => {
    return `${
      topseller === index ? "border-black" : "border-gray-300"
    } rounded-md transition border py-2  md:py-1 px-5`;
  };
  
  //animation
  const parentVarient = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVarient = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <section  className="container mx-auto mt-10">
        <h1  className="text-center font-bold text-2xl tracking-wide">
          Discover our top sellers
        </h1>
        <motion.div variants={parentVarient} initial="hidden" animate="visible"  className="flex justify-center gap-3 md:gap-10 mt-5">
          <button variants={itemVarient} onClick={() => changestatus(1)} className={buttonclass(1)}>
            Promotion
          </button>
          <button onClick={() => changestatus(2)} className={buttonclass(2)}>
            Limited
          </button>
          <button value={itemVarient} onClick={() => changestatus(3)} className={buttonclass(3)}>
            Best Sellers
          </button>
        </motion.div>

        <motion.div variants={parentVarient} initial="hidden" whileInView="visible" viewport={{once:true}} className="flex items-center flex-col md:flex-row mt-4 gap-6 justify-center">
          {data && Array.isArray(data) && data.length > 0
            ? data.map((product, key) => {
                return <motion.div key={key} variants={itemVarient}><Items data={product}  /></motion.div>;
              })
            : "Loading..."}
        </motion.div>
      </section>
    </>
  );
};

export default Topseller;
