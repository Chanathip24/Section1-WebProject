import React, { useEffect, useState } from "react";
import { Users, DollarSign, ShoppingCart, Package } from "lucide-react";
import axios from "axios";
//component
import Dashnav from "./components/Dashnav";
import StatsCard from "./components/StatsCard";

const Dashboard = () => {
  //orders data
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState({
    total: "",
    total_order: "",

  });
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/order/allorders`
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  //total _ amount
  details["total"] = orders?.reduce((acc, item) => {
    const num = parseFloat(item.total_amount);
    acc += num;
    return acc;
  }, 0.0);
  //all order
  details["total_order"] = orders?.length;
  return (
    <div className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav />

      <main className=" p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back to your beverage store dashboard
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Revenue"
            value={new Intl.NumberFormat("en-us").format(details.total)}
            icon={DollarSign}
            trend={{ type: "up", value: "12.5%" }}
          />
          <StatsCard
            title="Total Orders"
            value={new Intl.NumberFormat("en-us").format(details.total_order)}
            icon={ShoppingCart}
            trend={{ type: "up", value: "8.2%" }}
          />
          {/* <StatsCard
            title="Active Customers"
            value="892"
            icon={Users}
            trend={{ type: "down", value: "2.4%" }}
          />
          <StatsCard
            title="Products Sold"
            value="3,642"
            icon={Package}
            trend={{ type: "up", value: "5.8%" }}
          /> */}
        </div>

        {/* Recent Orders */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-lg">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                    Customer ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders && Array.isArray(orders)
                  ? orders.map((order, key) => (
                      <tr key={key}>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          #{order.order_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {order.user_id}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-800">
                          {order.total_amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "COMPLETED" //CANCELLED , PENDING
                                ? "bg-green-100 text-green-600"
                                : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
