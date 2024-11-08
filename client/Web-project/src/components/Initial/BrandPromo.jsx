import React from "react";
import {motion} from 'framer-motion'
//Compenent card
import BrandPromocard from "./BrandPromocard";
const Brand = () => {
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
    <motion.section variants={parentVarient} whileInView="visible" initial="hidden" viewport={{once:true}} className="container mx-auto flex flex-row gap-0 justify-center md:gap-52 my-24">
      <motion.div variants={itemVarient}><BrandPromocard  /></motion.div>
      <motion.div variants={itemVarient}><BrandPromocard  /></motion.div>
      <motion.div variants={itemVarient}><BrandPromocard  /></motion.div>
    </motion.section>
  );
};

export default Brand;
