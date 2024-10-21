import React from "react";

const MarqueeAnnouncement = () => {
  return (
    <nav className="container mx-auto rounded-md py-0.5 font-light" style={{ backgroundColor: "#BCF997" }}>
      <div className="marquee">
        <div>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
        </div>
      </div>
    </nav>
  );
};

export default MarqueeAnnouncement;
