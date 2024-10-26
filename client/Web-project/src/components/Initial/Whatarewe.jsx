import React from "react";
import CardArticle from "./CardArticle";

const Whatarewe = () => {
  return (
    <>
      {/*sec3*/}
      {/*text3*/}
      <section className="bg-white-300 mx-auto py-16  ">
        <h1 className="text-center mb-8 text-2xl font-bold">What are we?</h1>
        {/* card article */}
        <div className="flex flex-col md:flex-row mx-auto items-center gap-4">
          {/*-1-----------------------------------------------*/}
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
        </div>
      </section>
    </>
  );
};

export default Whatarewe;
