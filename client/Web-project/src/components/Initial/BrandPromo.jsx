import React from 'react'

//Compenent card
import BrandPromocard from './BrandPromocard';
const Brand = () => {
  return (
    <section className='container mx-auto flex flex-row gap-0 justify-center md:gap-52 mt-5'>
        <BrandPromocard/>
        <BrandPromocard/>
        <BrandPromocard/>
    </section>
  )
}

export default Brand