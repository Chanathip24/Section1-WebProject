import React from "react";
//icon

import Marqueetext from "./Marqueetext";
const MarqueeAnnouncement = () => {
  
  return (
    <section className="container mx-auto rounded-md py-0.5 font-light" style={{ backgroundColor: "#BCF997" }}>
      <div className="marquee">
        <div>
          <Marqueetext/>
          <Marqueetext/>
          <Marqueetext/>
          <Marqueetext/>
        </div>
      </div>
    </section>
  );
};

export default MarqueeAnnouncement;
