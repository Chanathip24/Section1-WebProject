import React from "react";
import CardArticle from "./CardArticle";

const Whatarewe = () => {
  const whatareweData = [
    {
      title: "Eco-Centrict Innovation",
      data : "Our commitment goes beyond great taste. Every sip supports a greener, more sustainable future."
    },
    {
      title : "Drink with Purpose",
      data : "Every bottle tells a story of care—for our planet, for people, and for tomorrow."
    },
    {
      title : "Better Choices, Better Planet",
      data : "We believe every decision matters. That’s why we use eco-friendly practices in every step."
    },
    {
      title : "Small Changes, Big Impact",
      data : "Together, we can make a difference. One beverage at a time, we’re reducing our footprint."
    }
  ]
  return (
    <>
      {/*sec3*/}
      {/*text3*/}
      <section className="bg-white-300 mx-auto py-16  ">
        <h1 className="text-center mb-8 text-2xl font-bold">What are we?</h1>
        {/* card article */}
        <div className="flex flex-col md:flex-row mx-auto items-center gap-4">
          {/*-1-----------------------------------------------*/}
          {whatareweData.map((item,key)=>{
            return <CardArticle key={key} data={item}/>
          })}
        </div>
      </section>
    </>
  );
};

export default Whatarewe;
