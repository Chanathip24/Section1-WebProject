import React from "react";
import Dashnav from "./components/Dashnav";
const DashOrder = () => {
  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav className="bg-white h-full" />
      <div className="overflow-y-scroll p-5 bg-[#FAF9F6]">
            Currently in development.
      </div>
    </section>
  );
};

export default DashOrder;
