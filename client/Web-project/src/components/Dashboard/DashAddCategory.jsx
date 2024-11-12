import React,{useState} from "react";
import axios from "axios";
//component
import Dashnav from "./components/Dashnav";
import DashEditHead from "./components/DashEditHead";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const DashAddCategory = () => {
    //navigation
    const navigate = useNavigate()
    //data
    const [data,setData] =useState({
        category_name:""
    })
    //handle new category
    const handleChange = (e)=>{
        setData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    //handlesubmit
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        if(data.category_name === "" || !data.category_name) return toast.error("Category name is empty.")
        try {
            const res = await axios.post("http://localhost:8081/category/create",data)
            navigate('/dashboard/category')
        } catch (error) {
            toast.error("This name is already created.")
        }
    }
  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
        <Toaster/>
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
        <DashEditHead title={"Create category"} url={"/dashboard/category"} />
        <form className="flex flex-col gap-5 w-1/2">
          <label>Category name</label>
          <input
            type="text"
            name="category_name"
            placeholder="Category name..."
            onChange={handleChange}
            className="focus:outline-none px-2 py-3 rounded-lg border border-gray-400"
          />
          <button onClick={handleSubmit} className="w-1/2 py-2 rounded-lg bg-blue-400 text-white">
            CREATE
          </button>
        </form>
      </section>
    </main>
  );
};

export default DashAddCategory;
