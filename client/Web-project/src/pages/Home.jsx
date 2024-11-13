import React from "react";

import { SwiperSlide } from "swiper/react";
//customhook
import useFetchData from "../hooks/useFetchData";
//element
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import Footer from "../components/Initial/Footer";
import MarqueeAnnouncement from "../components/Initial/MarqueeAnnouncement";
import Topseller from "../components/Initial/Topseller";
import Brand from "../components/Initial/BrandPromo";
import Slogan from "../components/Initial/Slogan";
import SimpleProduct from "../components/Initial/SimpleProduct";
import SubCarousel from "../components/Initial/SubCarousel";
import SubCarousel2 from "../components/Initial/SubCarousel2";
import Loading from "../components/Initial/Loading";
import SwiperCarousel from "../components/Initial/SwiperCarousel";

const Home = () => {
  const {data,loading,error} = useFetchData(`${import.meta.env.VITE_API_ROUTE}/product/getall`)
  //loading
  if (loading) return <Loading />;
  if(error) return <h1>Error isus  </h1>
  return (
    <>
    
      <Announcement />
      <Navbar />
      <main>
        <SwiperCarousel>
          <SwiperSlide className="h-full">
            <article className="relative w-full h-full">
              {/* text above bg */}
              <div className="text-white absolute h-full flex-col  p-8 px-10 justify-end flex">
                <h1 className="font-semibold text-4xl">
                  Beverage 50% Discount
                </h1>
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
              <button className="text-black mt-5 px-2 py-5 lg:w-1/2  bg-white rounded-lg">PRE-ORDER NOW</button>
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
        <Topseller data={data.slice(0, 3)} />
        <Brand />
        <hr className="container mx-auto"/>
        <Slogan />
        <SimpleProduct data={data.slice(1, 3)} />
        <SubCarousel />
        <SubCarousel2 />
        <SubCarousel />
        <SubCarousel />
      </main>
      <Footer />
    </>
  );
};

export default Home;
