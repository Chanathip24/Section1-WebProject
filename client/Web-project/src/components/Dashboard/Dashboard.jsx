import React from "react";
import Dashnav from "./components/Dashnav";

const Dashboard = () => {
  return (
    <>
      <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
        <Dashnav className="bg-white h-full" />
        <div className="overflow-y-scroll flex flex-grow flex-1  bg-[#FAF9F6]">
          Data
        </div>
      </section>
    </>
  );
};

export default Dashboard;
