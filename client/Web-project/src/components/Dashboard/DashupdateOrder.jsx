import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
//component
import Dashnav from "./components/Dashnav";
import { useNavigate, useParams } from "react-router-dom";
const DashupdateOrder = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [status, setStatus] = useState({
    status: "PENDING",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus((prev) => ({ ...prev, [name]: value }));
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_ROUTE}/order/updatestatus/${id}`,
        status
      );
      setTimeout(()=>{
        navigate('/dashboard/orders')
      },1500)
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Toaster />
      <Dashnav className="bg-white h-full" />

      <section className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-lg">Update order id {id}</h2>
        </div>
        <form className="px-7 mt-5">
          <label htmlFor="status" className="font-semibold">
            Update your status
          </label>
          <br />
          <select
            name="status"
            onChange={handleChange}
            className="w-[250px] p-2 mt-2 border rounded-lg"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <br />
          <button
            onClick={updateProduct}
            className="focus:outline-none p-2 px-5 rounded-lg bg-blue-400 text-white transition hover:text-white hover:bg-blue-600 mt-5"
          >
            Update
          </button>
        </form>
      </section>
    </section>
  );
};

export default DashupdateOrder;
