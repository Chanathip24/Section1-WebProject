import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
//customhook
import useFetchData from "../../hooks/useFetchData";
//icon
import { RiDeleteBinLine } from "react-icons/ri";
//component
import Dashnav from "./components/Dashnav";
import DashTitleHead from "./components/DashTitleHead";
import Loading from "../Initial/Loading";

const DashCategory = () => {
  //category data
  // const {data,loading,error} = useFetchData(`${import.meta.env.VITE_API_ROUTE}/category/getall`)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/category/getall`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  const deleteCatagory = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: `Do you want to delete ${name} category?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#dc2626", // red-600
        cancelButtonColor: "#4b5563", // gray-600
      });
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_ROUTE}/category/delete/` + id
          );
          await Swal.fire({
            title: "Deleted!",
            text: `${name} has been deleted.`,
            icon: "success",
            timer: 1500,
          });
          setData((data) => data.filter((item) => item.category_id !== id));
        } catch (error) {
          console.log("Delete error:", error);
          await Swal.fire({
            title: "Error!",
            text: "Failed to delete the product. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log("Sweet Alert error:", error);
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  //style
  const theaderStyle =
    "text-left text-xs font-medium text-gray-500 uppercase py-3 px-6";
  const trowStyle = "px-6 py-4 text-sm text-gray-800";
  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav className="bg-white h-full" />
      <section className="bg-white overflow-y-scroll p-5 ">
        <DashTitleHead
          title={"Product Category"}
          total={data?.length}
          url={"/dashboard/category/addcategory"}
        />
        <div className="overflow-x-auto">
          <table className="table-auto text-left w-full  border-separate border-spacing-y-4">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className={theaderStyle}>ID</th>
                <th className={theaderStyle}>Category Name</th>
                <th className={theaderStyle}></th>
              </tr>
            </thead>
            <tbody>
              {data && Array.isArray(data) ? (
                data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className={trowStyle}>{item.category_id}</td>
                      <td className={trowStyle}>{item.category_name}</td>
                      <td className={`${trowStyle} flex gap-2`}>
                        <Link
                          to={`/dashboard/category/editcategory/${item.category_id}`}
                        >
                          <button className="px-4 py-1 cursor-pointer bg-yellow-400 rounded-lg text-white hover:bg-yellow-500 transition">
                            Manage
                          </button>
                        </Link>

                        <button className="p-1 flex cursor-pointer items-center hover:bg-red-600 transition bg-red-500 rounded text-white text-xl">
                          <RiDeleteBinLine
                            onClick={() =>
                              deleteCatagory(
                                item.category_id,
                                item.category_name
                              )
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td className="px-4">No data</td>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default DashCategory;
