import React from 'react'
import { Link } from 'react-router-dom'

//component
import Dashnav from './components/Dashnav'
import DashProductForm from './components/DashProductForm'
import DashEditHead from './components/DashEditHead'
const DashEditProduct = () => {
  return (
    <>
    <section className="lg:grid lg:grid-cols-[250px_1fr] fixed w-full h-screen">
      <Dashnav className="bg-white h-full" />
      <section className="overflow-y-scroll p-5 bg-[#FAF9F6]">
        <DashEditHead url={"/dashboard/products"} title={"Edit Product"}/>
        <DashProductForm/>
      </section>
    </section>
  </>
  )
}

export default DashEditProduct