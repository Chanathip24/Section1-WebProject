import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
//component
import Dashnav from "./components/Dashnav";
import DashEditHead from "./components/DashEditHead";
const DashEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputstyle =
    "py-2.5 px-3 border focus:outline-none border-gray-400 rounded-lg";
  //productData
  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sub_cate: "",
    images: [],
  });
  //preview
  const [previews, setPreviews] = useState([]);
  //category data
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8081/category/getall");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProductbyid = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/product/product/" + id
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductbyid();
    fetchCategory();
  }, []);

  //handleFormchange for text
  const handleformChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Filter file that is not image
    const selectedImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    // show err if not img file
    if (selectedImages.length !== selectedFiles.length) {
      toast.error("Only image files are allowed.");
      return;
    }

    // check total of image 1 - 4
    if (selectedImages.length < 1 || selectedImages.length > 4) {
      toast.error("Please upload between 1 and 4 image files.");
      return;
    }

    // update product images
    setProduct((prev) => ({ ...prev, images: selectedImages }));

    // Create preview image
    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPreviews(imagePreviews);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // add text field
    Object.keys(product).forEach((key) => {
      if (key !== "images" && key !== "categories")
        formData.append(key, product[key]);
    });


    // add image
    product.images.forEach((image) => {
      formData.append("images", image);
    });
    
    try {
      const res = await axios.put(
        "http://localhost:8081/product/edit/" + id,
        formData
      );
      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Product updated failed");
    }
  };
  return (
    <>
      <Toaster />
      <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
        <Dashnav className="bg-white h-full" />
        <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
          <DashEditHead title={"Edit Product"} url={"/dashboard/products"} />
          <div className="grid grid-cols-2 gap-x-10">
            <div className="border border-gray-400 rounded-lg py-10 px-12">
              <h1 className="font-bold text-2xl">Images</h1>
              {/* Images Preview */}
              <div className="mt-5 w-full h-80 rounded-lg border border-black flex justify-center items-center overflow-hidden">
                {previews.length > 0 ? (
                  <img
                    src={previews[0]}
                    alt="Main preview"
                    className="h-full object-cover"
                  />
                ) : (
                  <p>No new image selected</p>
                )}
              </div>

              {/* Thumbnail Previews */}
              <div className="flex gap-3 mt-5">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="w-1/4 h-20 rounded-lg border border-black overflow-hidden"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <input
                className="mt-4"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                type="file"
              />
            </div>
            <div className="border border-gray-400 rounded-lg py-10 px-12">
              <form action="" className="flex gap-2 flex-col">
                <h1 className="font-bold text-2xl">Product Details</h1>
                <label>
                  Product Name : {product ? product.product_name : null}
                </label>
                <input
                  required
                  type="text"
                  name="product_name"
                  onChange={handleformChange}
                  className={inputstyle}
                  placeholder="Product name..."
                />

                <label>Category : </label>
                <select
                  name="category"
                  onChange={handleformChange}
                  className={inputstyle}
                >
                  <option value="">Select category</option>
                  {category &&
                    category.length > 0 &&
                    category
                      .slice(0, Math.ceil(category.length / 2))
                      .map((item) => (
                        <option key={item.category_id} value={item.category_id}>
                          {item.category_name}
                        </option>
                      ))}
                </select>

                <label>Sub Category : </label>
                <select
                  name="sub_cate"
                  onChange={handleformChange}
                  className={inputstyle}
                >
                  <option value="">Select sub category</option>
                  {category &&
                    category.length > 0 &&
                    category
                      .slice(Math.ceil(category.length / 2))
                      .map((item) => (
                        <option key={item.category_id} value={item.category_id}>
                          {item.category_name}
                        </option>
                      ))}
                </select>

                <label htmlFor="">Price {product ? product.price : null}</label>
                <input
                  required
                  onChange={handleformChange}
                  type="text"
                  className={inputstyle}
                  name="price"
                  placeholder="Price.."
                />

                <label htmlFor="">Description</label>
                <textarea
                  required
                  onChange={handleformChange}
                  name="description"
                  className={inputstyle}
                  value={product.description}
                  id=""
                ></textarea>

                <label htmlFor="">
                  Stock Quantity : {product ? product.stock_quantity : null}
                </label>
                <input
                  required
                  onChange={handleformChange}
                  type="text"
                  name="stock"
                  className={inputstyle}
                  id=""
                />
                <div className="flex justify-end mt-5">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-400 hover:bg-blue-500 transition px-5 py-2 rounded-lg text-white "
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default DashEditProduct;
