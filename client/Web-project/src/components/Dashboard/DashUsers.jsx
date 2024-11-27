import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
//component
import Dashnav from "./components/Dashnav";
//icon
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "../Initial/Loading";
import DashTitleHead from "./components/DashTitleHead";
import useFetchData from "../../hooks/useFetchData";
const DashUsers = () => {
  axios.defaults.withCredentials = true;

  //fetch data 
  // const {data,loading,error} = useFetchData(`${import.meta.env.VITE_API_ROUTE}/user/getall`)

  const [data, setData] = useState([]);
  const [loading , setLoading]= useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/user/getall`
        );
        setData(res.data);
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    };
    fetchData()
  });

  //delete user using id
  const deleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: `Do you want to delete user id ${id}?`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#4b5563"
      })
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_ROUTE}/user/delete/${id}`);
          await Swal.fire({
            title: "Deleted!",
            text: `User id ${id} has been deleted.`,
            icon: "success",
            timer: 1500
          })
          setData((prevUser) => prevUser.filter((user) => user.id !== id));
        } catch (error) {
          console.log(error)
          await Swal.fire({
            title: "Delete Failed",
            text: `Failed to delete user. Please try again.`,
            icon: "error",
            timer: 1500
          })
        }
      }
    } catch (error) {
      console.log("Sweet Alert error:", error);
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error"
      });
    }

  };

  //style
  const theaderStyle = "text-left text-xs font-medium text-gray-500 uppercase py-3 px-6"
  const trowStyle = "px-6 py-4 text-sm text-gray-800"
  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll  min-h-full p-5 bg-white">
        <DashTitleHead
          title={"All Users"}
          total={data?.length}
          url={"/dashboard/users/addusers"}
        />
        <div className="overflow-x-auto">
          <table className="table-auto text-left w-full  border-separate border-spacing-y-4">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className={theaderStyle}>ID</th>
                <th className={theaderStyle}>First Name</th>
                <th className={theaderStyle}>Last Name</th>
                <th className={theaderStyle}>Phone</th>
                <th className={theaderStyle}>Email</th>
                <th className={theaderStyle}>Role</th>
                <th className={theaderStyle}></th>
              </tr>
            </thead>
            <tbody>
              
              { data && Array.isArray(data) && data.length > 0 ? (
                data.map((data, key) => {
                  return (
                    <tr className="border" key={key}>
                      <td className={trowStyle}>{data.id}</td>
                      <td className={trowStyle}>{data.fname}</td>
                      <td className={trowStyle}>{data.lname}</td>
                      <td className={trowStyle}>{data.phone}</td>
                      <td className={trowStyle}>{data.email}</td>
                      <td className={trowStyle}>{data.role}</td>
                      <td className={`${trowStyle} flex gap-2`}>
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
                  <Loading/>
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
