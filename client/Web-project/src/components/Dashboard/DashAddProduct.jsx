import React, { useState } from "react";
import Dashnav from "./components/Dashnav";
import { Link } from "react-router-dom";
import DashProductForm from "./components/DashProductForm";
import DashEditHead from "./components/DashEditHead";
const DashAddProduct = () => {
  return (
    <>
      <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
        <Dashnav className="bg-white h-full" />
        <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
          <DashEditHead title={"Create Product"}  url={"/dashboard/products"}/>
          <DashProductForm/>
        </section>
      </section>
    </>
  );
};

export default DashAddProduct;
