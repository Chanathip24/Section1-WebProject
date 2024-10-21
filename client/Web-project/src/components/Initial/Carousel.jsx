import React,{useEffect, useState} from "react";


import "swiper/css/autoplay";


const Carousel = () => {
    const [index , setIndex] = useState(0)

    //Go next Slide
    const NextSlide = ()=>{
        setIndex((prev)=>{
            if(prev === 3-1) return 0 //จำนวน slide
            return prev+1
        })
    }

    useEffect(()=>{
       const myinterval = setInterval(()=>{
            NextSlide()
        },3000)
        return ()=> clearInterval(myinterval)
    },[])
    
  return (
    <section className="container mx-auto mb-3">
      <div className="Carousel rounded-xl">
        <div className="Slide" style={{translate : `${-100 * index}%`}}>
            
          <img
            src="https://www.hospitalitymagazine.com.au/wp-content/uploads/2023/06/FSR-Webmag-Advertorial-Perrier-Value-Hero-Image-1000px.jpg?w=900"
            alt=""
          />
        </div>
        <div className="Slide" style={{translate : `${-100 * index}%`}}><img src="https://www.hospitalitymagazine.com.au/wp-content/uploads/2023/06/FSR-Webmag-Advertorial-Perrier-Value-Hero-Image-1000px.jpg?w=900" alt="" /></div>
        <div className="Slide" style={{translate : `${-100 * index}%`}}><img src="https://www.hospitalitymagazine.com.au/wp-content/uploads/2023/06/FSR-Webmag-Advertorial-Perrier-Value-Hero-Image-1000px.jpg?w=900" alt="" /></div>
      </div>
      
    </section>
  );
};

export default Carousel;
