import React, { useState } from "react";
import Announcement from "../components/Initial/Announcement";
import Navbar from "../components/Initial/Navbar";
import Footer from "../components/Initial/Footer";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Initial/Loading";
import useFetchData from "../hooks/useFetchData";
import toast from "react-hot-toast";
import ImageModal from "../components/Initial/ImageModal";

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetchData(`${import.meta.env.VITE_API_ROUTE}/product/product/` + id);

  if (loading) return <Loading />;

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cartItems.findIndex(
      (item) => item.product_name === product.product_name
    );

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      const newProduct = { ...product, quantity: 1 };
      cartItems.push(newProduct);
    }
    toast.success("Add product to your cart.");
    //Update
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <main className="container mx-auto">
        <h1 className="my-4 md:mx-0 font-semibold">
          <span className="font-normal">
            <Link className="underline-animation" to="/">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link className="underline-animation" to="/shop">
              shop
            </Link>{" "}
            &gt;{" "}
          </span>
          {product.product_name}
        </h1>

        <section className="flex mb-10 flex-col md:flex-row flex-wrap justify-center md:flex-nowrap gap-8">
          <div className="h-max md:w-1/2 flex-col items-center justify-center">
            {Array.isArray(product.images) && product.images.length > 0 && (
              <img
                src={`${import.meta.env.VITE_API_ROUTE}/${product.images[0]}`}
                onClick={() => openModal(0)}
                className="rounded-xl border w-full  h-[50%] bg-gray-200 text-gray-500 text-2xl flex justify-center object-cover items-center cursor-pointer hover:opacity-90 transition-opacity"
              />
            )}

            <div className="flex gap-5 mt-4">
              {Array.isArray(product.images) &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_API_ROUTE}/${image}`}
                    alt="Beverage Image"
                    onClick={() => openModal(index)}
                    className="rounded object-cover w-[120px] h-[100px] border bg-blue-200 text-gray-500 text-2xl flex justify-center items-center cursor-pointer hover:opacity-90 transition-opacity"
                  />
                ))}
            </div>
          </div>

          <div className="md:w-1/2 px-10 flex flex-col gap-8 mb-10">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {product.product_name}
              </h1>
              <h1 className="text-sm text-gray-500">
                {Array.isArray(product.categories) &&
                product.categories.length > 0
                  ? product.categories[0]
                  : null}{" "}
                {Array.isArray(product.categories) &&
                product.categories.length > 1
                  ? `| ${product.categories[1]}`
                  : ""}
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-xl font-semibold text-gray-800">
                  ฿{product.price}
                </p>
                {product.stock_quantity > 0 ? (
                  <p className="text-sm font-medium">
                    <span className="text-green-300">● </span>In stock!
                  </p>
                ) : (
                  <p className="text-sm font-medium">
                    <span className="text-red-500">● </span>Out of stock!
                  </p>
                )}
              </div>
            </div>
            {product.stock_quantity > 0 ? (
              <button
                onClick={addToCart}
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-green-600"
              >
                BUY
              </button>
            ) : (
              <button
                disabled={true}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full font-semibold"
              >
                Out of stock!
              </button>
            )}

            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Get free gift for order above 300 baht</li>
              <li>• ALERT! Drink happy, feel happy.</li>
            </ul>
            <div className="border border-gray-300 rounded-lg p-3 bg-gray-100">
              <p className="text-sm underline-animation toleft">
                <span className="text-green-300 mr-4 ml-4">● </span>
                Member exclusive Get free 15% discount for buying first product
              </p>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="text-sm">{product.description}</p>
          </div>
        </section>
      </main>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product.images || []}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />

      <Footer />
    </>
  );
};

export default ProductDetail;
