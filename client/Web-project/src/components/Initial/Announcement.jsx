import React, { useState, useEffect } from "react";
import toast,{Toaster} from 'react-hot-toast'
//external packages
import TextTransition, { presets } from "react-text-transition";

const Announcement = () => {
  //copy to clipboard function
  const copythis = (text) => {
    navigator.clipboard.writeText(text).then(() => { toast.success("Copy the code successfully.") }).catch((err) => { toast.err("Code was expired") })
  }

  //text for announcement
  const TEXTS = [
    "LIMITED TIME OFFER | Buy 3 Get 1 Free on all juice packs!",
    <span>Code: <span onClick={() => copythis("BEVERAGE20")} className="font-bold p-1 underline cursor-pointer">BEVERAGE20</span> | Enjoy 20% off your first order of any drink!</span>,
    "SPECIAL PROMOTION | Join our subscription service for discounts!",
    "CLEARANCE SALE | Grab our summer flavors at 50% off!"
  ];

  //index to swap announcement
  const [index, setIndex] = useState(0);

  //count 3 sec to swap
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2500 // every 3 seconds
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Toaster position="bottom-right"/>
      <header style={{ backgroundColor: "#BCF997" }} className="flex justify-center font-light text-sm py-2.5 overflow-hidden">
        <TextTransition springConfig={presets.gentle}>
          <p className="text-xs md:text-sm truncate">{TEXTS[index % TEXTS.length]}</p>
        </TextTransition>
      </header>
    </>

  );
};

export default Announcement;
