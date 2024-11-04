import React, { useState, useEffect } from "react";
import axios from "axios";
//element
import Navbar from "../Initial/Navbar";
import Announcement from "../Initial/Announcement";
import Footer from "../Initial/Footer";
import MarqueeAnnouncement from "../Initial/MarqueeAnnouncement";
import Carousel from "../Initial/Carousel";
import Topseller from "../Initial/Topseller";
import Brand from "../Initial/BrandPromo";
import Slogan from "../Initial/Slogan";
import SimpleProduct from "../Initial/SimpleProduct";
import SubCarousel from "../Initial/SubCarousel";
import SubCarousel2 from "../Initial/SubCarousel2";
import Loading from "../Initial/Loading";

const Home = () => {
  //all product fetching
  const [data, setData] = useState([]);
  //loading
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/product/getall");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  //loading
  if(loading) return <Loading/>
  return (
    <>
      <Announcement />
      <Navbar />
      <main>
        <Carousel />
        <MarqueeAnnouncement />
        <Topseller data={data.slice(0, 3)} />
        <Brand />
        <Slogan />
        <SimpleProduct data={data.slice(1, 3)} />
        <SubCarousel />
        <SubCarousel2 />
        <SubCarousel />
        <SubCarousel />
      </main>

      <Footer />
    </>
  );
};

export default Home;
