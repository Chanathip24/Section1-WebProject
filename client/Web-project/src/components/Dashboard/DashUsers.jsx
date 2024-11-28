import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Dashnav from "./components/Dashnav";
import { RiDeleteBinLine } from "react-icons/ri";
import DashTitleHead from "./components/DashTitleHead";

const DashUsers = () => {
  axios.defaults.withCredentials = true;
  const [search, setSearch] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/user/getall`
        );
        setOriginalData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Robust search function
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(originalData);
    } else {
      const lowercasedSearch = search.toLowerCase().trim();
      const filtered = originalData.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearch)
        )
      );
      setFilteredData(filtered);
    }
  }, [search, originalData]);

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
      });

      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_ROUTE}/user/delete/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: `User id ${id} has been deleted.`,
          icon: "success",
          timer: 1500
        });
        setOriginalData((prevUser) => prevUser.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Delete Failed",
        text: `Failed to delete user. Please try again.`,
        icon: "error",
        timer: 1500
      });
    }
  };

  const theaderStyle = "text-left text-xs font-medium text-gray-500 uppercase py-3 px-6";
  const trowStyle = "px-6 py-4 text-sm text-gray-800";

  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll  min-h-full p-5 bg-white">
        <DashTitleHead
          setSearch={setSearch}
          title={"All Users"}
          total={filteredData?.length}
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
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((user, key) => (
                  <tr className="border" key={key}>
                    <td className={trowStyle}>{user.id}</td>
                    <td className={trowStyle}>{user.fname}</td>
                    <td className={trowStyle}>{user.lname}</td>
                    <td className={trowStyle}>{user.phone}</td>
                    <td className={trowStyle}>{user.email}</td>
                    <td className={trowStyle}>{user.role}</td>
                    <td className={`${trowStyle} flex gap-2`}>
                      <Link to={`/dashboard/users/editusers/${user.id}`}>
                        <button className="px-4 py-1 cursor-pointer bg-yellow-400 rounded-lg text-white hover:bg-yellow-500 transition">
                          Manage
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-1 flex cursor-pointer items-center hover:bg-red-600 transition bg-red-500 rounded text-white text-xl"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className={trowStyle}>No data</td>
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