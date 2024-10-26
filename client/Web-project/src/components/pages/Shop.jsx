import React from "react";
import Navbar from "../Initial/Navbar";
import Announcement from "../Initial/Announcement";
import Carousel from "../Initial/Carousel";
import MarqueeAnnouncement from "../Initial/MarqueeAnnouncement";
import Items from "../Initial/ProductCard";
import Footer from "../Initial/Footer";

const Shop = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Carousel />
      <MarqueeAnnouncement />
      <section className="mt-5 container mx-auto ">
        <h1>Home {'>'} <span className="font-bold">Shop</span> </h1>
        <section className=" place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
        </section>
      </section>
      <Footer/>
    </>
  );
};

export default Shop;
