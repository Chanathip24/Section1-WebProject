import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

//swiper style
import "swiper/css";

//import
import { Autoplay } from "swiper/modules";

const SubCarousel2 = () => {
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

  //list of quote
  const quote = [
    {
      data: '"Mastering the art of sipping, one refreshment at a time."',
      author: "Top",
    },
    { data: '"Brewed to perfection, enjoyed in every sip."', author: "Achi" },
    {
      data: '"Because every drop is worth its weight in gold."',
      author: "Gun",
    },
    {
      data: '"Pour, sip, and chill—refreshment like no other."',
      author: "Jab",
    },
  ];

  return (
    <section className="container mx-auto">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        className="h-44"
      >
        {quote.map((item, key) => {
          return (
            <SwiperSlide key={key} className="h-full flex items-center">
              <article className="text-center w-full">
                <h1 className="text-4xl font-semibold">{item.data}</h1>
                <p className="mt-2">{item.author}</p>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SubCarousel2;
