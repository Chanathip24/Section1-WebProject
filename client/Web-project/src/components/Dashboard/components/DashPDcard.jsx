import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
const DashPDcard = ({ data, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8081/product/delete/" + data.product_id
      );
      //updateData
      onDelete(data.product_id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <article className="rounded-2xl p-4 border border-gray-300 mt-5">
      <div className="relative rounded-2xl">
        <Link to={`/product/${data.product_id}`}>
          <img
            src={
              data.images[0]
                ? `http://localhost:8081/${data.images[0]}`
                : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
            className="rounded-2xl h-[200px] object-cover"
            width={200}
            alt=""
          />
        </Link>

        <div className="w-3/4 px-3 py-1 bg-blue-300 absolute top-0 right-0 rounded-lg mr-2 mt-2">
          <p className="text-center truncate">
            {data.categories[0] ? data.categories[0] : "No category"}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <div className="w-2/4 overflow-hidden ">
          <h1 className="truncate text-ellipsis">{data.product_name}</h1>
          <p>฿{data.price}</p>
        </div>
        <div>
          <p>
            <span className="text-gray-400">Stock</span> {data.stock_quantity}
          </p>
          <p>
            <span className="text-gray-400">Sold</span> {data.sold_quantity}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Link to={`/dashboard/products/editproducts/${data.product_id}`}>
          <button className="py-1 px-3 bg-blue-500 rounded-lg text-white">
            Edit
          </button>
        </Link>

        <button
          onClick={handleDelete}
          className="py-1 px-3 bg-red-500 rounded-lg text-white"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default DashPDcard;
