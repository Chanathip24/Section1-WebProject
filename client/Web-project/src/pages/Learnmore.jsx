import React from "react";
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import Footer from "../components/Initial/Footer";
import SubCarousel from "../components/Initial/SubCarousel";
import Video from "../components/Initial/Video";
import Whatarewe from "../components/Initial/Whatarewe";

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
