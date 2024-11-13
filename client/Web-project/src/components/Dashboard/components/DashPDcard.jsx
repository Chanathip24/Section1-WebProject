import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

//modal
import Swal from 'sweetalert2'
const DashPDcard = ({ data, onDelete }) => {
 const handleDelete = async () => {
  try {
    const result = await Swal.fire({
      title: `Do you want to delete ${data.product_name}?`,
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
          `${import.meta.env.VITE_API_ROUTE}/product/delete/${data.product_id}`
        );
        
        await Swal.fire({
          title: "Deleted!",
          text: `${data.product_name} has been deleted.`,
          icon: "success",
          timer: 1500
        });

        onDelete(data.product_id);
      } catch (error) {
        console.log("Delete error:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete the product. Please try again.",
          icon: "error"
        });
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

  const defaultImage = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  return (
    <article className="rounded-2xl p-4 border w-[250px] border-gray-300 mt-5 flex flex-col">
      <div className="relative w-full">
        <Link to={`/product/${data.product_id}`}>
          <div className="relative w-full h-48">
            <img
              src={data.images?.[0] ? `http://localhost:8081/${data.images[0]}` : defaultImage}
              className="rounded-2xl w-full h-full object-cover"
              alt={data.product_name || "Product image"}
            />
          </div>
        </Link>
        
        <div className="absolute top-2 right-2 max-w-[75%]">
          <div className="px-3 py-1 bg-blue-300 rounded-lg">
            <p className="text-center text-sm truncate">
              {data.categories?.[0] || "No category"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow mt-3 space-y-3">
        <div className="flex justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="font-medium text-base truncate">
              {data.product_name}
            </h2>
            <p className="text-lg font-semibold mt-1">฿{data.price}</p>
          </div>
          
          <div className="flex flex-col text-sm">
            <p className="text-right">
              <span className="text-gray-400">Stock:</span> {data.stock_quantity}
            </p>
            <p className="text-right">
              <span className="text-gray-400">Sold:</span> {data.sold_quantity}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-auto pt-2">
          <Link
            to={`/dashboard/products/editproducts/${data.product_id}`}
            className="py-1.5 px-4 bg-blue-500 rounded-lg text-white text-sm hover:bg-blue-600 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="py-1.5 px-4 bg-red-500 rounded-lg text-white text-sm hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default DashPDcard;