import React from "react";
//component
import Announcement from "../components/Initial/Announcement";
import Navbar from "../components/Initial/Navbar";
import Footer from "../components/Initial/Footer";
import SubCarousel from "../components/Initial/SubCarousel";

//icon
import { IoLocationSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
const Contactus = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <SubCarousel />
      <main className="min-h-screen container mx-auto ">
        <section>
          <div className="px-10 gap-5 md:gap-0 flex-col md:flex-row flex justify-center items-center">
            <form className="md:w-1/2">
              <div className="bg-white mb-8">
                <h2 className="text-2xl font-semibold">Get in touch</h2>
                <p className="text-sm font-light ">
                  We are here for you! How can we help you?
                </p>
              </div>
              <div>
                <label className="mb-3 text-sm">Name</label>
                <input
                  placeholder="Your name..."
                  type="text"
                  className="mt-1 focus:outline-none rounded-xl border border-neutral-400 w-full h-11 p-4 mb-8"
                />
                <label className="mb-3 text-sm">Email</label>
                <input
                  placeholder="Your email..."
                  type="text"
                  className="mt-1 focus:outline-none rounded-xl border border-neutral-400 w-full h-11  p-4 mb-8"
                />
                <label className="mb-3 text-sm">Message</label>
                <textarea
                  placeholder="Your message..."
                  className="mt-1 focus:outline-none rounded-xl border border-neutral-400 w-full h-40 text-sm p-4 mb-8 resize-none "
                  defaultValue={""}
                />
              </div>
              <button className="h-12 w-4/12 mr-4 text-sm bg-sky-400 text-white font-semibold rounded-xl hover:bg-sky-600 active:bg-white active:text-black">
                Submit
              </button>
            </form>
            <figure className="flex flex-col  items-center w-1/2">
              {/* img */}
              <div className="w-[380px] h-[380px] bg-stone-200 rounded-full" >
                <img src={'people/peopleGun.jpg'} className="w-full h-full rounded-full object-cover" alt="" />
              </div>
              <div className="mt-10 pl-16">
                <p className="text-sm font-light mb-4 ">
                  <IoLocationSharp className="inline mr-2 text-xl" /> Thailand
                </p>
                <p className="text-sm font-light ">
                  <IoMail className="text-xl inline mr-2" /> company@company.com
                </p>
              </div>
            </figure>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contactus;
