import React from 'react'
import { RiDrinksLine } from "react-icons/ri";
const BrandPromocard = () => {
  return (
    <div className='flex flex-col items-center p-5 md:p-8 '>
        <RiDrinksLine className='text-4xl md:text-5xl'/>
        <p>Beverage</p>
        <p>Refreshing</p>
    </div>
  )
}

export default BrandPromocard