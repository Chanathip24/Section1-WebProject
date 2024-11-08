import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

//icon
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
//custom hook for fetch
import useFetchData from "../../hooks/useFetchData";
//component
import Navbar from "../Initial/Navbar";
import Announcement from "../Initial/Announcement";
import SubCarousel from "../Initial/SubCarousel";
import Footer from "../Initial/Footer";
import Loading from "../Initial/Loading";
import Items from "../Initial/ProductCard";

const Search = () => {
  //button active
  const [index, setIndex] = useState(0);
  //change button
  const changeButton = (n) => {
    setIndex(n);
  };
  //button style
  const buttonStyle = (n) => {
    return `${
      n === index ? "text-black border-black " : "text-gray-300"
    } border h-16 md:w-28 md:h-10  transition hover:animate-pulse text-center rounded-lg hover:border-black hover:text-black `;
  };
  const inputStyle =
    "focus:outline-none border w-full md:w-60 h-12 text-left rounded-md p-2";
  const inputboxStyle = "flex flex-col";

  //fetchProduct
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetchData("http://localhost:8081/product/getall");

  //fetchCategory
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useFetchData("http://localhost:8081/category/getall");
  const mainCategory =
    categoryData && Array.isArray(categoryData)
      ? categoryData.slice(0, categoryData.length / 2)
      : [];
  const subCategory =
    categoryData && Array.isArray(categoryData)
      ? categoryData.slice(categoryData.length / 2)
      : [];

  //form
  const formRef = useRef(null);
  //ค่าเสิร์ช
  const [searchData, setSearch] = useState({
    product_name: "",
    category: "",
    sub_category: "",
    price_range: "",
  });
  //handleChange for form
  const handleChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //product after filter by search
  const [realProduct, setRealProduct] = useState([]);
  //submit search data
  const handleSubmit = (e) => {
    e.preventDefault();
    const categories = [searchData.category, searchData.sub_category];
    console.log(searchData.product_name);
    const filteredProduct = productData.filter((item) => {
      // check name
      const isProductNameMatch =
        !searchData.product_name ||
        item.product_name
          .toLowerCase()
          .includes(searchData.product_name.toLowerCase());
      //check category
      const isCategoryMatch = categories
        .filter((item) => item)
        .every((category) => item.categories.includes(category));

      //check price max min
      const priceCheck =
        (!searchData.min_price ||
          item.price > parseFloat(searchData.min_price)) &&
        (!searchData.max_price ||
          item.price < parseFloat(searchData.max_price));

      return (
        isProductNameMatch &&
        (isCategoryMatch || isCategoryMatch.length === 0) &&
        priceCheck
      );
    });
    setRealProduct(filteredProduct);
    console.log(searchData)
    if(filteredProduct.length === 0){
      toast.error("No products found.")
      resetForm();
      return;
    }else{
      toast.success(`${filteredProduct.length} products found.`);
      toggleSearch();
      resetForm();
    }

  };

  //resetform
  const resetForm = () => {
    formRef.current.reset();
    setSearch({
      product_name: "",
      category: "",
      sub_category: "",
      min_price: "",
      max_price: "",
    });
    
  };

  //search
  const [isSearch, setToggle] = useState(true);
  const toggleSearch = () => {
    setToggle(!isSearch);
  };
  //check loading
  if (productLoading || categoryLoading) return <Loading />;
  return (
    <>
    <Announcement/>
      <Navbar />
      <SubCarousel />
      <main className="container mx-auto">
        {/* Search Form */}
        <h1 className="mb-5 md:mb-3 flex text-2xl font-semibold items-center justify-end">
          {" "}
          Toggle menu
          <MdOutlineKeyboardArrowDown
            className="text-5xl"
            onClick={toggleSearch}
          />{" "}
        </h1>

        <section
          className={`${
            isSearch
              ? "max-h-72 md:max-h-72 opacity-100 mt-0 "
              : "max-h-0 opacity-0 mt-10"
          } overflow-y-scroll md:overflow-hidden px-5 transition-all  ease-in-out`}
        >
          {/* Title */}
          <div className="flex md:justify-between flex-col md:flex-row font-semibold justify-center">
            <h1 className="font-bold text-2xl md:text-start text-center">
              Search Menu
            </h1>
            <button
              onClick={resetForm}
              className="underline-animation toleft h-16 md:w-28 md:h-10  m-5 md:m-0"
            >
              Reset Search
            </button>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            className="flex  flex-wrap md:flex-row my-5 flex-col gap-x-4 md:gap-y-12 gap-y-8"
          >
            <div className={inputboxStyle}>
              <label htmlFor="productName">Product name</label>
              <input
                onChange={handleChange}
                type="text"
                name="product_name"
                id="productName"
                placeholder="Coca-Cola"
                className={inputStyle}
              />
            </div>

            <div className={inputboxStyle}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                onChange={handleChange}
                name="category"
                className={inputStyle}
              >
                <option value="">All</option>
                {mainCategory.map((item, key) => {
                  return (
                    <option key={key} value={item.category_name}>
                      {item.category_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={inputboxStyle}>
              <label htmlFor="subCategory">Sub category</label>
              <select
                onChange={handleChange}
                id="subCategory"
                name="sub_category"
                className={inputStyle}
              >
                <option value="">All</option>
                {subCategory.map((item, key) => {
                  return (
                    <option key={key} value={item.category_name}>
                      {item.category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="priceRange">Min price</label>
              <input
                type="text"
                onChange={handleChange}
                className={inputStyle}
                placeholder="Min price"
                name="min_price"
              />
            </div>
            <div className={inputboxStyle}>
              <label htmlFor="priceRange">Max price</label>
              <input
                type="text"
                onChange={handleChange}
                className={inputStyle}
                placeholder="Max price"
                name="max_price"
              />
            </div>

            <div className={inputboxStyle}>
              <label htmlFor="">Search</label>
              <button
                onClick={handleSubmit}
                type="submit"
                id="resultsPerPage"
                className="bg-blue-400 py-3 px-16 text-white w-full h-full rounded-lg border border-blue-400 hover:bg-transparent transition hover:text-blue-500"
              >
                Search
              </button>
            </div>
          </form>
        </section>
        {/* Show product after search*/}
        <section className="container mx-center">
          {realProduct.length > 0 && (
            <div>
              <h1 className="font-bold text-2xl text-center md:text-start">
                Search Result
              </h1>
              <p className="text-center md:text-start text-gray-500 mb-5">
                {realProduct.length} products found.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 place-items-center ">
            {realProduct.length > 0
              ? realProduct.map((product, key) => {
                  return <Items data={product} key={key} />;
                })
              : ""}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Search;
