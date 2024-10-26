import React, { useEffect, useState } from "react";





const Carousel = () => {
  const [index, setIndex] = useState(0)

  //Go next Slide
  const NextSlide = () => {
    setIndex((prev) => {
      if (prev === 3 - 1) return 0 //จำนวน slide
      return prev + 1
    })
  }

  useEffect(() => {
    const myinterval = setInterval(() => {
      NextSlide()
    }, 5000)
    return () => clearInterval(myinterval)
  }, [])

  return (
    <section className="container mx-auto mb-3">
      <div className="Carousel rounded-xl">
        <div className="Slide h-auto lg:h-[500px] " style={{ translate: `${-100 * index}%` }}>
          <div className="absolute bottom-0 left-0 w-full p-5 lg:p-0 lg:bottom-20 lg:left-16 z-10 text-white">
            <h1 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Get 50% Discount</h1>
            <p className="font-light tracking-wide mb-5">Pre-order today and save!</p>
            <button className="bg-white text-black w-full lg:w-auto hover:text-gray-600 transition  rounded px-14 py-3 text-sm "><span className="underline-animation toleft">
            PRE-ORDER NOW</span></button> 

          </div>

          <img
            src="https://www.hospitalitymagazine.com.au/wp-content/uploads/2023/06/FSR-Webmag-Advertorial-Perrier-Value-Hero-Image-1000px.jpg?w=900"
            alt="A pictures of beverage product and our promotions"
          />
        </div>
        <div className="Slide h-auto lg:h-[500px]" style={{ translate: `${-100 * index}%` }}><img src="https://www.hospitalitymagazine.com.au/wp-content/uploads/2023/06/FSR-Webmag-Advertorial-Perrier-Value-Hero-Image-1000px.jpg?w=900" alt="" /></div>
        <div className="Slide h-auto lg:h-[500px]" style={{ translate: `${-100 * index}%` }}><img src="https://www.hospitalitymagazine.com.au/wp-content/uploads/2023/06/FSR-Webmag-Advertorial-Perrier-Value-Hero-Image-1000px.jpg?w=900" alt="" /></div>
      </div>

    </section>
  );
};

export default Carousel;
