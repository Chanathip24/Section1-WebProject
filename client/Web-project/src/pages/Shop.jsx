import React from "react";
import useFetchData from "../hooks/useFetchData";
import { SwiperSlide } from "swiper/react";

//component
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import MarqueeAnnouncement from "../components/Initial/MarqueeAnnouncement";

import Items from "../components/Initial/ProductCard";
import Footer from "../components/Initial/Footer";
import SwiperCarousel from "../components/Initial/SwiperCarousel";
import Loading from "../components/Initial/Loading";

const Shop = () => {
  //all product fetching
  const {data,loading,error} = useFetchData("http://localhost:8081/product/getall")

  if(loading) return <Loading/>
  return (
    <>
      <Announcement />
      <Navbar />
      <SwiperCarousel>
        <SwiperSlide className="h-full">
          <article className="relative w-full h-full">
            {/* text above bg */}
            <div className="text-white absolute h-full flex-col  p-8 px-10 justify-end flex">
              <h1 className="font-semibold text-4xl">Beverage 50% Discount</h1>
              <p>Pre-order today and save!</p>
              <button className="text-black mt-5 px-2 py-5 lg:w-1/2  bg-white rounded-lg">
                PRE-ORDER NOW
              </button>
            </div>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/92/258/373/bar-beverage-cocktail-cold-wallpaper-preview.jpg"
              alt=""
              className="rounded-xl w-full h-full object-cover"
            />
          </article>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <article className="relative w-full h-full">
            {/* text above bg */}
            <div className="text-white absolute h-full flex-col  p-8 px-10 justify-end flex">
              <h1 className="font-semibold text-4xl">Beverage 50% Discount</h1>
              <p>Pre-order today and save!</p>
              <button className="text-black mt-5 px-2 py-5 lg:w-1/2  bg-white rounded-lg">
                PRE-ORDER NOW
              </button>
            </div>
            <img
              src="https://c0.wallpaperflare.com/preview/797/39/616/beverage-citrus-close-up-cocktail.jpg"
              alt=""
              className="rounded-xl w-full h-full object-cover"
            />
          </article>
        </SwiperSlide>
      </SwiperCarousel>
      <MarqueeAnnouncement />
      <section className="mt-5 min-h-screen  container mx-auto ">
        <h1 className="ml-2 md:ml-0">
          Home {">"} <span className="font-bold">Shop</span>{" "}
        </h1>
        <section className="mt-4 place-items-center gap-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {data && Array.isArray(data) && data.length > 0
            ? data.map((product, key) => {
                return <Items data={product} key={key} />;
              })
            : null}
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
