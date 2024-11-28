import React, { useEffect, useState } from "react";
import Dashnav from "./components/Dashnav";
import Dashcate from "./components/Dashcate";
import DashPDcard from "./components/DashPDcard";
import DashTitleHead from "./components/DashTitleHead";
import axios from "axios";

const DashProduct = () => {
  const [search, setSearch] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/product/getall`
        );
        setOriginalData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.error(error);
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
      const filtered = originalData.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearch)
        )
      );
      setFilteredData(filtered);
    }
  }, [search, originalData]);

  const deleteProduct = (id) => {
    setOriginalData((prevProducts) =>
      prevProducts.filter((product) => product.product_id !== id)
    );
  };

  return (
    <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav className="bg-white h-full" />
      <div className="overflow-y-scroll p-5 bg-white">
        <DashTitleHead
          setSearch={setSearch}
          title={"All Products"}
          total={filteredData?.length}
          url={"/dashboard/products/addproducts"}
        />
        <Dashcate />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
          {filteredData && filteredData.length > 0
            ? filteredData.map((product, key) => (
                <DashPDcard
                  data={product}
                  onDelete={deleteProduct}
                  key={key}
                />
              ))
            : "No products found"}
        </div>
      </div>
    </section>
  );
};

export default DashProduct;