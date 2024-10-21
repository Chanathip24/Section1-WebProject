import React from 'react'
//element
import Navbar from '../Initial/Navbar'
import Announcement from '../Initial/Announcement'
import Footer from '../Initial/Footer'
import MarqueeAnnouncement from '../Initial/MarqueeAnnouncement'
import Carousel from '../Initial/Carousel'
const Home = () => {
  return (
    <>
    <Announcement/>
    <Navbar/>
    <Carousel/>
    <MarqueeAnnouncement/>
    <main>
        Main content
    </main>
    <Footer/>
    </>
  )
}

export default Home