import React from "react";

//component
import Announcement from "../components/Initial/Announcement";
import Navbar from "../components/Initial/Navbar";
import Footer from "../components/Initial/Footer";
import SubCarousel from "../components/Initial/SubCarousel";
import Teamcard from "../components/Initial/Teamcard";

const Aboutus = () => {
  const teamData = [
    {
      name : "Jab Chanathip",
      position : "Coding",
      github : "github",
      ig : "ig",
      img: "https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/332853438_719701729701322_606043752226058657_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=SJwt4R4vWT0Q7kNvgGy5hgV&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&_nc_gid=AHzxq0aaGqip2h2cmbsbTBZ&oh=00_AYA8ibrXCfQnp_Cy1-w9EGFM2qbhiz-qy-puAPPu-aVloA&oe=67467064"
    },
    {
      name : "Gun",
      position : "Coding",
      github : "github",
      ig : "ig",
      img: "people/peopleGun.jpg"
    },
    {
      name : "Top",
      position : "Coding",
      github : "github",
      ig : "ig",
      img : "people/peopleTop.jpg"
    },
    {
      name : "Achi",
      position : "Coding",
      github : "github",
      ig : "ig",
      img : "people/peopleAchi.jpg"
    }
  ]
  return (
    <>
      <Announcement />
      <Navbar />
      <SubCarousel />
      <main>
        
        <section className="bg-white mx-5 md:mx-36 md:my-16">
          <div className="bg-white rounded-sm my-8">
            <p className="font-medium ">The team</p>
            <div className="bg-white my-2">
              <h2 className="text-2xl font-semibold">
                Meet our team of our <br /> company
              </h2>
            </div>
            <p className="font-light ">
              To become the beverage company our customers love, it takes a{" "}
              <br /> passionate team of creators. Meet the people at [Your
              Beverage Brand] <br />
              who are dedicated to crafting refreshing drinks you'll enjoy every
              time.
            </p>
          </div>
          {/* Name card */}
          <div className="grid md:grid-cols-3 gap-y-5 place-items-center grid-cols-1 mt-5">
            {teamData.map((item,key)=>{
              return <Teamcard data={item}/>
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Aboutus;
