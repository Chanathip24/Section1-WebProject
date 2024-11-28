import React, { useEffect, useState } from "react";
import Dashnav from "./components/Dashnav";
import axios from "axios";

import { Toaster } from "react-hot-toast";
const Dashemail = () => {
  const [emails, setEmails] = useState([]);
  const fetchEmail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/mail/allmail`
      );
      setEmails(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMail = async (mailid) =>{
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_ROUTE}/mail/mail/${mailid}`)
        setEmails((prev)=> prev.filter(item => item.mail_id != mailid))
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Toaster />
      <Dashnav className="bg-white h-full" />
      {/* Recent Orders */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-lg">Recent Email</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                  Mail ID
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                  Full Name
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                  Message
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {emails && Array.isArray(emails)
                ? emails.map((order, key) => (
                    <tr key={key}>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        #{order.mail_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {order.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-800">
                        {order.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600`}
                        >
                          {order.message}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <button
                          onClick={() => deleteMail(order.mail_id)}
                          className="mr-2 bg-red-100 transition hover:bg-red-400 hover:text-white text-red-600 p-1.5 rounded-md"
                        >
                          Delete
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

export default Dashemail;
