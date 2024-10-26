import React from "react";
import Navbar from "../Initial/Navbar";
import Announcement from "../Initial/Announcement";
import Footer from "../Initial/Footer";
import SubCarousel from "../Initial/SubCarousel";
import Video from "../Initial/Video";
import Whatarewe from "../Initial/Whatarewe";

const Learnmore = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <main>
        <SubCarousel />
        <section className="container mx-auto">
          <Video />
          <Whatarewe />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Learnmore;
