import React from "react";

const MarqueeAnnouncement = () => {
  return (
    <div className="container mx-auto rounded-md py-0.5 font-light" style={{ backgroundColor: "#BCF997" }}>
      <div className="marquee">
        <div>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
          <span>You spin me right round, baby. Like a record, baby.</span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeAnnouncement;
