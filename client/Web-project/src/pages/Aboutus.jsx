import React from "react";

//component
import Announcement from "../components/Initial/Announcement";
import Navbar from "../components/Initial/Navbar";
import Footer from "../components/Initial/Footer";
import SubCarousel from "../components/Initial/SubCarousel";
import Teamcard from "../components/Initial/Teamcard";

const Aboutus = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <SubCarousel />
      <main>
        <section className="bg-white mx-5 md:mx-36 md:my-16">
          <div className="bg-white rounded-sm my-8">
            <p className="font-medium ">The team</p>
            <div className="bg-white my-2">
              <h2 className="text-2xl font-semibold">
                Meet our team of our <br /> company
              </h2>
            </div>
            <p className="font-light ">
              To become the beverage company our customers love, it takes a{" "}
              <br /> passionate team of creators. Meet the people at [Your
              Beverage Brand] <br />
              who are dedicated to crafting refreshing drinks you'll enjoy every
              time.
            </p>
          </div>
          {/* Name card */}
          <div className="grid md:grid-cols-3 gap-y-5 place-items-center grid-cols-1 mt-5">
            <Teamcard/>
            <Teamcard/>
            <Teamcard/>
            <Teamcard/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Aboutus;
