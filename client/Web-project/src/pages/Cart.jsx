import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import Footer from "../components/Initial/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const loadCartFromStorage = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    const calculateSubTotal = () => {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setSubTotal(total);
    };
    calculateSubTotal();
  }, [cartItems]);

  const updateQuantity = (productId, change, stock = 0) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product_id === productId) {
        const newQuantity = Math.max(
          1,
          Math.min(item.quantity + change, stock)
        );
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.product_id !== productId
    );
    console.log(updatedCart);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <main className="min-h-screen  bg-zinc-200/50">
        <section className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Main Cart Section */}
            <section className="flex-1 mt-10">
              <header className="py-10">
                <h1 className="text-3xl font-semibold">Shopping Bag</h1>
                <p className="text-gray-600">
                  {cartItems.length} items in your bag.
                </p>
              </header>

              <div className="bg-white rounded-xl p-4 lg:p-8 mb-8">
                {cartItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4">Product</th>
                          <th className="text-center py-4 px-4">Price</th>
                          <th className="text-center py-4 px-4">Quantity</th>
                          <th className="text-center py-4 px-4">Total</th>
                          <th className="text-center py-4 px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, key) => (
                          <tr key={key} className="border-b">
                            <td className="py-4 px-4">
                              <div className="flex gap-4 items-center">
                                <img
                                  src={`${import.meta.env.VITE_API_ROUTE}/${
                                    item.images[0]
                                  }`}
                                  alt={item.product_name}
                                  className="border w-20 h-20 object-cover rounded-lg bg-zinc-200"
                                />
                                <div>
                                  <span className="text-sm text-zinc-400 block">
                                    {item.categories[0]}
                                  </span>
                                  <span className="font-semibold block">
                                    {item.product_name}
                                  </span>
                                  {item.categories[1] && (
                                    <span className="text-sm text-zinc-600">
                                      {item.categories[1]}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              ฿{item.price.toLocaleString()}
                            </td>
                            <td className="text-center py-4 px-4">
                              <div className="flex items-center justify-center gap-3">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_id,
                                      -1,
                                      item.stock_quantity
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_id,
                                      1,
                                      item.stock_quantity
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              ฿{(item.price * item.quantity).toLocaleString()}
                            </td>
                            <td className="text-center py-4 px-4">
                              <button
                                onClick={() => removeItem(item.product_id)}
                                className="p-2 hover:bg-red-50 rounded-full text-red-500"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                )}
              </div>
            </section>

            {/* Order Summary Section */}
            <section className="lg:w-80 mt-10">
              <div className="bg-white rounded-xl p-6 sticky top-8">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>฿{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>฿{subTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <h1>Shipping Address</h1>
                  <textarea name="" placeholder="shipping address" className="resize-none border border-gray-500 focus:outline-none rounded-lg w-full" id=""></textarea>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-green-600 transition-colors"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
