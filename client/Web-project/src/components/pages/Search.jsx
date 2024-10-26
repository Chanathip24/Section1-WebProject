import React,{useState} from "react";

//component
import Navbar from "../Initial/Navbar";
import Announcement from "../Initial/Announcement";
import SubCarousel from "../Initial/SubCarousel";
import Footer from "../Initial/Footer";

const Search = () => {
    //button active
    const [index,setIndex]= useState(0)
    //change button
    const changeButton = (n)=>{
        setIndex(n)
    }
  //button style
  const buttonStyle = (n) => {
    return `${n === index ? "text-black border-black " : "text-gray-300"} border h-16 md:w-28 md:h-10  transition hover:animate-pulse text-center rounded-lg hover:border-black hover:text-black `;
  };
  const inputStyle =
    "focus:outline-none border w-full md:w-60 h-12 text-left rounded-md p-2";
  const inputboxStyle = "flex flex-col";

  return (
    <>
      <Announcement />
      <Navbar />

      <main className="container mx-auto">
        <SubCarousel />
        <section className="my-10 px-10 md:px-0">
          <div className="flex md:justify-between flex-col md:flex-row font-semibold justify-center">
            <div className="flex justify-center md:justify-start gap-2 flex-col md:flex-row">
              <button onClick={()=>changeButton(0)} className={buttonStyle(0)}>Beverages</button>
              <button onClick={()=>changeButton(1)} className={buttonStyle(1)}>Bottle</button>
              <button onClick={()=>changeButton(2)} className={buttonStyle(2)}>Accessory</button>
            </div>
            <button className="h-16 md:w-28 md:h-10 hover:underline m-5 md:m-0">
              Reset Search
            </button>
          </div>

          <form className="flex  flex-wrap md:flex-row my-5 flex-col gap-x-4 md:gap-y-12 gap-y-8">
            <div className={inputboxStyle}>
              <label htmlFor="productName">Product name</label>
              <input
                type="text"
                id="productName"
                placeholder="Coca-Cola"
                className={inputStyle}
              />
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="category">Category</label>
              <select id="category" className={inputStyle}>
                <option>All</option>
              </select>
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="subCategory">Sub category</label>
              <select id="subCategory" className={inputStyle}>
                <option>All</option>
              </select>
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="priceRange">Price range</label>
              <select id="priceRange" className={inputStyle}>
                <option>0-1000</option>
              </select>
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="sortBy">Sort by</label>
              <select id="sortBy" className={inputStyle}>
                <option>Price</option>
              </select>
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="resultsPerPage">Results per page</label>
              <input type="text" id="resultsPerPage" className={inputStyle} />
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="resultsPerPage">Search</label>
              <button type="submit" id="resultsPerPage" className="bg-blue-400 py-3 px-16 text-white w-full h-full rounded-lg border border-blue-400 hover:bg-transparent transition hover:text-blue-500" >Search</button>
            </div>

          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Search;
