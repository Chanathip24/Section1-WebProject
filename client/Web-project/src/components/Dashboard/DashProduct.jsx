import React from "react";
import Dashnav from "./components/Dashnav";
import Dashcate from "./components/Dashcate";
import DashPDcard from "./components/DashPDcard";

import { Link } from "react-router-dom";
import DashTitleHead from "./components/DashTitleHead";
const DashProduct = () => {
  return (
    <>
      <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
        <Dashnav className="bg-white h-full" />
        <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
          <DashTitleHead title={"All Products"} total={123} url={"/dashboard/products/addproducts"} />
          
          <Dashcate />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            <DashPDcard />
            
          </div>
        </section>
      </section>
    </>
  );
};

export default DashProduct;
