import React,{useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
//component
import Dashnav from "./components/Dashnav";
import DashEditHead from "./components/DashEditHead";

const DashEditCategory = () => {
    const {id} = useParams()
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
            const res = await axios.put("http://localhost:8081/category/update/"+id,data)
            navigate('/dashboard/category')
        } catch (error) {
            console.log(error)
            toast.error("This name is already created.")
        }
    }
  return (
    <main className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
        <DashEditHead title={"Edit Category"} url={"/dashboard/category"} />
        <form className="flex flex-col gap-3 w-1/2">
          <label>New category name</label>
          <input
            type="text"
            name="category_name"
            onChange={handleChange}
            placeholder="Category name..."
            className="focus:outline-none px-2 py-3 rounded-lg border border-gray-400"
          />
          <button type="submit" onClick={handleSubmit} className="w-1/2 py-2 rounded-lg bg-blue-400 text-white">
            CREATE
          </button>
        </form>
      </section>
    </main>
  );
};

export default DashEditCategory;
