import React from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
const Items = ({ data }) => {
  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    
    const existingProductIndex = cartItems.findIndex(
      (item) => item.product_name === data.product_name
    );

    if (existingProductIndex !== -1) {
      
      cartItems[existingProductIndex].quantity += 1;
      
    } else {
      
      const newProduct = { ...data, quantity: 1 };
      cartItems.push(newProduct);
      
    }
    toast.success("Add product to your cart.")
    //Update
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  return (
    <article className="w-80 border  md:w-60  p-4">
      <div className="topcard w-[100%] h-[200px]  relative rounded-xl">
        <div className="rounded-xl absolute bottom-0 flex justify-center w-full">
          <button
            className="buybutton  transition opacity-0 text-white w-10/12 rounded-lg py-2 mb-4"
            onClick={addToCart}
            style={{ background: "#37c567" }}
          >
            <span >Buy</span>
          </button>
        </div>
        <NavLink to={`/product/`+data.product_id}>
          {" "}
          <img
            className="rounded-xl w-full h-full object-cover border  hover:cursor-pointer"
            src={
              data
                ? `http://localhost:8081/${data.images[0]}`
                : "https://s3.amazonaws.com/www-inside-design/uploads/2018/12/The-product-of-you-810x810.png"
            }
            alt=""
            width={400}
          />
        </NavLink>
      </div>

      <h1 className="font-bold my-2">{data ? data.product_name : null}</h1>
      <p className="">฿{data ? data.price : null}</p>
      <p className="truncate text-gray-500">{data ? data.description : null}</p>
    </article>
  );
};

export default Items;
