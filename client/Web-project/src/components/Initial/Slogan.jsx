import React from "react";

const Slogan = () => {
  return (
    <div className="container  mx-auto rounded-lg relative flex overflow-x-hidden">
      <div className="py-12 animate-marquee  whitespace-nowrap">
        <span className="text-xl font-semibold mx-16">Pure Energy, No Guilt</span>
        <span className="text-xl font-semibold mx-16">Clean, Green, and Mean</span>
        <span className="text-xl font-semibold mx-16">Sippin' Good, Feelin' Great</span>
        <span className="text-xl font-semibold mx-16">Refreshment on Point</span>
        <span className="text-xl font-semibold mx-16">Zero Sugar, Full Flavor</span>
      </div>

      <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
        <span className="text-xl font-semibold mx-16">Pure Energy, No Guilt</span>
        <span className="text-xl font-semibold mx-16">Clean, Green, and Mean</span>
        <span className="text-xl font-semibold mx-16">Sippin' Good, Feelin' Great</span>
        <span className="text-xl font-semibold mx-16">Refreshment on Point</span>
        <span className="text-xl font-semibold mx-16">Zero Sugar, Full Flavor</span>
      </div>
    </div>
  );
};

export default Slogan;
