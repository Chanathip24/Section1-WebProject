import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//component
import Dashnav from "./components/Dashnav";
//icon
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "../Initial/Loading";
import DashTitleHead from "./components/DashTitleHead";
const DashUsers = () => {
  axios.defaults.withCredentials = true;

  //data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch all users data
  const fetchdata = async () => {
    try {
      const res = await axios.get("http://localhost:8081/user/getall");
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //delete
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8081/user/delete/${id}`);
      setData((prevUser) => prevUser.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //fetchdata
  useEffect(() => {
    fetchdata();
  }, []);

  //load data
  if (loading) {
    return <Loading />;
  }

  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll  min-h-full p-5 bg-[#FAF9F6]">
        <DashTitleHead
          title={"All Users"}
          total={data.length}
          url={"/dashboard/users/addusers"}
        />
        <div className="overflow-x-auto">
          <table className="table-auto text-left w-full  border-separate border-spacing-y-4">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data && data.length > 0 ? (
                data.map((data, key) => {
                  return (
                    <tr className="border" key={key}>
                      <td className="px-4 ">{data.id}</td>
                      <td className="px-4 ">{data.fname}</td>
                      <td className="px-4 ">{data.lname}</td>
                      <td className="px-4 ">{data.phone}</td>
                      <td className="px-4 ">{data.email}</td>
                      <td className="px-4 ">{data.role}</td>
                      <td className="px-4 flex justify-center gap-2">
                        <Link to={`/dashboard/users/editusers/${data.id}`}>
                          <button className="px-4 py-1 cursor-pointer bg-yellow-400 rounded-lg text-white hover:bg-yellow-500 transition">
                            Manage
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteUser(data.id)}
                          className="p-1 flex cursor-pointer items-center hover:bg-red-600 transition bg-red-500 rounded text-white text-xl"
                        >
                          <RiDeleteBinLine />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default DashUsers;
