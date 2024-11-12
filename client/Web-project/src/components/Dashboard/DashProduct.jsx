import React,{useEffect,useState} from "react";
import Dashnav from "./components/Dashnav";
import Dashcate from "./components/Dashcate";
import DashPDcard from "./components/DashPDcard";
import DashTitleHead from "./components/DashTitleHead";
import axios from "axios";

const DashProduct = () => {
  //data
  const [data,setData] = useState([])
  //effect
  useEffect(()=>{
    const fetchProduct = async () =>{
      try {
        const res = await axios.get("http://localhost:8081/product/getall")
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  },[])

  //delete
  const deleteProduct = (id) => {
    setData((prevProducts) => prevProducts.filter(product => product.product_id !== id));
  };
  return (
    <>
      <section className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
        <Dashnav className="bg-white h-full" />
        <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
          <DashTitleHead title={"All Products"} total={data.length} url={"/dashboard/products/addproducts"} />
          
          <Dashcate />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
            {data && data.length > 0 ? data.map((product,key)=>{
              return <DashPDcard data={product} onDelete={deleteProduct} key={key}/>
            }) : "No product..."}

            
          </div>
        </section>
      </section>
    </>
  );
};

export default DashProduct;
