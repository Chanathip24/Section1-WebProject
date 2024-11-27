import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Receipt,
} from "lucide-react";
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";

const OrderDetailPage = ({ orderDetails }) => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    `${import.meta.env.VITE_API_ROUTE}/order/user/orders/${id}`
  );

  const [products, setProduct] = useState(null);
  const [details, setDetails] = useState({
    total_item: 0,
    total_price: 0,
  });
  useEffect(() => {
    if (data?.order) {
      const total_item = data.order.order.length;
      setDetails({
        total_price: data.order.total_amount,
        total_item: total_item,
      });

      const mergeName = {
        ...data.order,
        order: data.order.order.map((item) => {
          // Find the product by matching product_id
          const product = data.product_name.find(
            (product) => product.product_id === item.product_id
          );
          return {
            ...item,
            product_name: product?.name,
          };
        }),
      };
      setProduct(mergeName);


    }
  }, [data]);

  return (
    <>
      <Announcement />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Order Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Order #{data?.order.order_id}
              </h1>
              <p className="text-gray-600">
                Ordered on {data?.order.order_date}
              </p>
            </div>
            <span
              className={`
                ${
                  data?.order.status === "COMPLETED"
                    ? "bg-green-100 text-green-600"
                    : data?.order.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                } 
                px-3 py-1 rounded-full text-sm font-semibold
              `}
            >
              {data?.order.status}
            </span>
          </div>
        </header>

        {/* Order Summary */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <ShoppingCart className="w-12 h-12 text-blue-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Total Items</h3>
              <p className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat().format(details.total_item)}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <Receipt className="w-12 h-12 text-green-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Total Amount</h3>
              <p className="text-2xl font-bold text-gray-800">
                ฿{new Intl.NumberFormat().format(details.total_price)}
              </p>
            </div>
          </div>
        </section>

        {/* Order Items */}
        <section className="bg-white shadow-md rounded-lg mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {products !== null && products.order.length > 0
                  ? products.order.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-800">
                          {item.product_name}a
                        </td>
                        <td className="p-4 text-sm text-gray-800">
                          {item.quantity}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderDetailPage;
