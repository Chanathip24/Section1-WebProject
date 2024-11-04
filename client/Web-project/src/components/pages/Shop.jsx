import React,{useState,useEffect} from "react";
import axios from "axios";
import Navbar from "../Initial/Navbar";
import Announcement from "../Initial/Announcement";
import Carousel from "../Initial/Carousel";
import MarqueeAnnouncement from "../Initial/MarqueeAnnouncement";
import Items from "../Initial/ProductCard";
import Footer from "../Initial/Footer";

const Shop = () => {
  //all product fetching
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/product/getall");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Announcement />
      <Navbar />
      <Carousel />
      <MarqueeAnnouncement />
      <section className="mt-5  container mx-auto ">
        <h1 className="ml-2 md:ml-0">
          Home {">"} <span className="font-bold">Shop</span>{" "}
        </h1>
        <section className="mt-4 place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {data && Array.isArray(data) && data.length > 0 ? data.map((product,key)=>{
            return <Items data={product} key={key}/>
          }) : null}
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
