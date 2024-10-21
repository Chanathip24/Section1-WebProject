import React, { useState, useEffect } from "react";

//external packages
import TextTransition, { presets } from "react-text-transition";
const Announcement = () => {
  //text for announcement
  const TEXTS = [
    "MICROENERGY DEALS | Refresh & refocus with exclusive sets!",
    "Code: STUDY5 | Subscribe to 5+ 12-Packs, get one free! T&Cs.",
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
    <nav style={{backgroundColor:"#BCF997"}} className="flex justify-center font-light text-sm py-2.5">
      <TextTransition springConfig={presets.gentle}>
        <p>{TEXTS[index % TEXTS.length]}</p>
      </TextTransition>
    </nav>
  );
};

export default Announcement;
