import React from "react";
import { Swiper } from "swiper/react";
import {motion} from 'framer-motion'

//swiper style
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//import
import { Pagination, Autoplay, Navigation ,EffectCoverflow} from "swiper/modules";
const SwiperCarousel = ({ children }) => {
  return (
    <motion.section initial={{opacity : 0}} animate={{opacity:1}} className="container mx-auto mb-5 rounded-xl">
      <Swiper
      
        pagination={{ clickable: true }}
        navigation
        
        modules={[Pagination, Navigation, Autoplay,EffectCoverflow]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        className="h-[400px] px-2 md:px-0 lg:h-[500px]" 

      >
        {children}
      </Swiper>
    </motion.section>
  );
};

export default SwiperCarousel;
