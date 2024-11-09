import React from "react";
import { ImCheckmark } from "react-icons/im";
const MarqueeAnnouncement = () => {
  return (
    <>
      {/* announcement */}
      <div className="bg-[#BCF997] rounded-lg container mx-auto relative flex overflow-x-hidden">
        <div className="py-1 animate-marquee whitespace-nowrap">
          <span className="mx-16">
            <ImCheckmark className="inline" /> Zero sugar
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" /> Natural Ingredients
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" /> Refreshing
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" />
            Clean, Green, and Mean
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" />
            Sippin' Good, Feelin' Great
          </span>
        </div>

        <div className="absolute top-0 py-1  animate-marquee2 whitespace-nowrap">
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" /> Zero sugar
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" /> Natural Ingredients
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" /> Refreshing
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" />
            Clean, Green, and Mean
          </span>
          <span className="mx-16">
            <ImCheckmark className="inline mr-2" />
            Sippin' Good, Feelin' Great
          </span>
        </div>
      </div>
    </>
  );
};

export default MarqueeAnnouncement;
