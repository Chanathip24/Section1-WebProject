import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//icon
import { RiDeleteBinLine } from "react-icons/ri";
//component
import Dashnav from "./components/Dashnav";
import DashTitleHead from "./components/DashTitleHead";
import Loading from "../Initial/Loading";
const DashCategory = () => {
  //loading status
  const [loading, setLoading] = useState(false);
  //category data
  const [data, setData] = useState([]);
  //fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8081/category/getall");
        setData(res.data);
      } catch (error) {
        setLoading(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteCatagory = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:8081/category/delete/" + id
      );
      setData((data) => data.filter((item) => item.category_id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Loading />;
  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
        <DashTitleHead
          title={"Product Category"}
          total={data.length}
          url={"/dashboard/category/addcategory"}
        />
        <div className="overflow-x-auto">
          <table className="table-auto text-left w-full  border-separate border-spacing-y-4">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Category Name</th>
                <th className="px-4 py-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {data && Array.isArray(data) ? (
                data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className="px-4">{item.category_id}</td>
                      <td className="px-4">{item.category_name}</td>
                      <td className="px-4 flex gap-4">
                        <Link
                          to={`/dashboard/category/editcategory/${item.category_id}`}
                        >
                          <button className="px-4 py-1 cursor-pointer bg-yellow-400 rounded-lg text-white hover:bg-yellow-500 transition">
                            Manage
                          </button>
                        </Link>

                        <button className="p-1 flex cursor-pointer items-center hover:bg-red-600 transition bg-red-500 rounded text-white text-xl">
                          <RiDeleteBinLine
                            onClick={() => deleteCatagory(item.category_id)}
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
