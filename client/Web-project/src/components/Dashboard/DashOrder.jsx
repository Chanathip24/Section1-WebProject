import React, { useState, useEffect } from "react";
import Dashnav from "./components/Dashnav";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const DashOrder = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
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

  //delete order
  const deleteOrder = async (order_id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_ROUTE}/order/deleteorder/${order_id}`)
      toast.success(res.data.msg)

      //update state
      const newProduct = orders.filter((item)=> item.order_id !== order_id)
      setOrders(newProduct)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  };
  ///updatestatus/:order_id
  const statusOrder = async (order_id) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_ROUTE}/order/updatestatus/${order_id}`)
      toast.success(res.data.msg)

      //update state
      const newProduct = orders.filter((item)=> item.order_id !== order_id)
      setOrders(newProduct)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  //delete function
  //manage function
  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Toaster/>
      <Dashnav className="bg-white h-full" />
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
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                  Manage
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
                        {new Intl.NumberFormat().format(order.total_amount)}
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
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <button onClick={()=> deleteOrder(order.order_id)} className="mr-2 bg-red-100 transition hover:bg-red-400 hover:text-white text-red-600 p-1.5 rounded-md">
                          Delete
                        </button>
                        <button onClick={()=> navigate(`/dashboard/orders/update/${order.order_id}`)} className="mr-2 transition hover:bg-yellow-400 hover:text-white bg-yellow-100 text-yellow-600 p-1.5 rounded-md">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default DashOrder;
