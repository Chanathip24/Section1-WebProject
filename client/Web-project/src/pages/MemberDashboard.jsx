import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Receipt,
  Package,
  UserCircle
} from "lucide-react";
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";

import useFetchData from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
const MemberDashboard = () => {
    //navigate
    const navigate =useNavigate()
  //user data
  const { data: user } = useFetchData(
    `${import.meta.env.VITE_API_ROUTE}/user/checklogin`
  );

  //detail
  const [detail, setDetail] = useState({
    total_amount: 0,
    total_order: 0,
    pending_order: 0,
  });
  //all order
  const { data, loading, error } = useFetchData(
    `${import.meta.env.VITE_API_ROUTE}/order/user/orders`
  );

  useEffect(() => {
    if (data?.orders.length > 0) {
      const total_price = data.orders.reduce((acc, item) => {
        acc += parseFloat(item.total_amount);
        return acc;
      }, 0);
      const total_orders = data.orders.length
      const pending_orders = data.orders.reduce((acc,item)=>{
        if(item.status === "PENDING") acc.push(item)
        return acc
      },[])

      setDetail({
        total_amount: total_price,
        total_order: total_orders,
        pending_order: pending_orders,
      })
    }
  }, [data]);

  return (
    <>
      <Announcement />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* User Profile Header */}
        <header className="flex items-center mb-8 space-x-4">
          <UserCircle className="w-16 h-16 text-gray-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hi</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <ShoppingCart className="w-12 h-12 text-blue-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-800">{new Intl.NumberFormat().format(detail?.total_order)}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <Receipt className="w-12 h-12 text-green-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Total Spent</h3>
              <p className="text-2xl font-bold text-gray-800">฿{new Intl.NumberFormat().format(detail?.total_amount)}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <Package className="w-12 h-12 text-purple-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Pending Orders</h3>
              <p className="text-2xl font-bold text-gray-800">{new Intl.NumberFormat().format(detail?.pending_order.length)}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <section className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Order History
            </h2>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && Array.isArray(data.orders)
                  ? data.orders.map((item, key) => (
                      <tr key={key} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-800">
                          #{item.order_id}
                        </td>
                        <td className="p-4 text-sm text-gray-800">
                          {item.order_date.split("T")[0]}
                        </td>
                        <td className="p-4 text-sm text-gray-800">
                          ฿{new Intl.NumberFormat().format(item.total_amount)}
                        </td>
                        <td className="p-4">
                          <span
                            className={`${
                              item.status !== "CANCELLED"
                                ? item.status !== "COMPLETED"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            } px-2 py-1 text-xs font-semibold rounded-full `}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button onClick={()=> navigate(`/member/dashboard/order/${item.order_id}`)} className="text-blue-600 hover:underline">
                            View Details
                          </button>
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

export default MemberDashboard;
