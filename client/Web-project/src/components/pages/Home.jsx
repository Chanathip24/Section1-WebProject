import React, { useState } from 'react'
//element
import Navbar from '../Initial/Navbar'
import Announcement from '../Initial/Announcement'
import Footer from '../Initial/Footer'
import MarqueeAnnouncement from '../Initial/MarqueeAnnouncement'
import Carousel from '../Initial/Carousel'
import Topseller from '../Initial/Topseller'
import Brand from '../Initial/BrandPromo'
import Slogan from '../Initial/Slogan'
import SimpleProduct from '../Initial/SimpleProduct'
import SubCarousel from '../Initial/SubCarousel'
import SubCarousel2 from '../Initial/SubCarousel2'
const Home = () => {

  return (
    <main>
      <Announcement />
      <Navbar />
      <Carousel />
      <MarqueeAnnouncement />
      <Topseller />
      <Brand/>
      <Slogan/>
      <SimpleProduct/>
      <SubCarousel/>
      <SubCarousel2/>
      <SubCarousel/>
      <SubCarousel/>
      <Footer />
    </main>
  )
}

export default Home