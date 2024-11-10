import React, { useState } from 'react'

//icon
import { CiHeart } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
const Footer = () => {
  //toggle phone
  const [isOpen, setOpen] = useState(0)


  const toggle = (index) => {
    
    if(index === isOpen) return setOpen(0)
    setOpen(index)
  }

  return (
    <>
      {/* คอม */}
      <footer className=' hidden lg:block bg-gray-100 py-8 '>
        <div className="container mx-auto">
          <h1 className='text-4xl font-bold tracking-wider mb-1'>Refresh your drink, not the planet.</h1>
          <p className='font-light'>Refresh your drink, not the planet.</p>

          <div className='w-full grid gap-5  grid-cols-3 mt-5'>
            <div className='w-2/3 border border-black p-4'>
              <h1 className='font-bold text-xl'>15% discount for new customer sign up now!</h1>
              <p className='font-thin'>Sign up to our newsleter and receive it now!</p>
              <div className='flex flex-col gap-2 my-4'>
                <input type="text" className='p-1.5 rounded-sm border border-black focus:outline-none' placeholder='Your first name' />
                <input type="text" className='p-1.5 rounded-sm border border-black focus:outline-none' placeholder='Your email address' />
              </div>

              <button className='rounded-md bg-black px-4 py-3 transition border border-black hover:bg-white hover:text-black  text-white'>SIGN UP NOW</button>
              <p className='font-thin text-sm mt-2 mb-10'>By submitting this form you agree that we will keep you informed with promotional updates on a regular basis. Offer applicable only to customer's who have not signed up to our newsletter in the past.</p>
            </div>
            <div className='w-2/3'>
              <h1 className='font-bold text-lg pb-5 '>Our website</h1>
              <ul className='flex gap-2 flex-col'>
                <li className='cursor-pointer underline-animation toleft'>Our Story</li>
                <li className='cursor-pointer underline-animation toleft'>Products</li>
                <li className='cursor-pointer underline-animation toleft'>Accessories</li>
                <li className='cursor-pointer underline-animation toleft'>Bottle</li>
              </ul>
            </div>
            <div className='w-2/3'>
              <h1 className='font-bold text-lg pb-5'>Legal</h1>
              <ul className='flex gap-2 flex-col'>
                <li className='cursor-pointer underline-animation toleft'>Privacy Policy</li>
                <li className='cursor-pointer underline-animation toleft'>Terms of Use</li>
                <li className='cursor-pointer underline-animation toleft'>Accessiblity</li>

              </ul>
            </div>
          </div>
        </div>

      </footer>


      {/* มือถือ */}
      <footer className=' lg:hidden bg-gray-100 py-10 px-16 md:px-4 mt-20'>
        <div className="container mx-auto">
          <h1 className='text-4xl font-bold tracking-wider mb-1'>Refresh your drink, not the planet.</h1>
          <p className='font-light'>Refresh your drink, not the planet.</p>

          <div className='w-full grid gap-5  grid-cols-1 mt-5'>
            <div className=' border border-black p-4'>
              <h1 className='font-bold text-xl'>15% discount for new customer sign up now!</h1>
              <p className='font-thin'>Sign up to our newsleter and receive it now!</p>
              <div className='flex flex-col gap-2 my-4'>
                <input type="text" className='p-1.5 rounded-sm border border-black focus:outline-none' placeholder='Your first name' />
                <input type="text" className='p-1.5 rounded-sm border border-black focus:outline-none' placeholder='Your email address' />
              </div>

              <button className='rounded-md bg-black px-4 py-3 transition border border-black hover:bg-white hover:text-black  text-white'>SIGN UP NOW</button>
              <p className='font-thin text-sm mt-2 mb-10'>By submitting this form you agree that we will keep you informed with promotional updates on a regular basis. Offer applicable only to customer's who have not signed up to our newsletter in the past.</p>
            </div>
            <div>
              {/* Legal Section */}
              <div onClick={() => toggle(2)} className='flex justify-between cursor-pointer'>
                <h1 className='font-bold flex items-center'>Legal</h1>
                <h1 className='text-2xl flex items-center'><GoPlus /></h1>
              </div>

              {/* Content for Legal */}
              <ul className={`flex gap-2 flex-col mt-5 transition-all duration-500 ease-in-out overflow-hidden ${isOpen === 2 ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-5"}`}>
                <li className='cursor-pointer underline-animation toleft'>Privacy Policy</li>
                <li className='cursor-pointer underline-animation toleft'>Terms of Use</li>
                <li className='cursor-pointer underline-animation toleft'>Accessiblity</li>
              </ul>
            </div>

            <div >
              <div onClick={() => toggle(1)} className='flex justify-between cursor-pointer'>
                <h1 className='font-bold flex items-center'>Our website</h1>
                <h1 className='text-2xl flex items-center '><GoPlus /></h1>
              </div>

              <ul className={`flex gap-2 flex-col mt-5 transition-all ease-in-out overflow-hidden duration-500 ${isOpen === 1 ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-5"}`}>
                <li className='cursor-pointer underline-animation toleft'>Our Story</li>
                <li className='cursor-pointer underline-animation toleft'>Products</li>
                <li className='cursor-pointer underline-animation toleft'>Accessories</li>
                <li className='cursor-pointer underline-animation toleft'>Bottle</li>
              </ul>
            </div>

          </div>
        </div>

      </footer>

      <div className='w-full p-4  md:mx-0 bg-black text-white'>
        <h1 className='mx-3 md:mx-0 flex items-center justify-end'>Made with <CiHeart/> by Jab and friends</h1>
      </div>
      

    </>

  )
}

export default Footer