import React, { useState } from 'react'
import Items from './ProductCard'

const Topseller = () => {
    //button active
    const [topseller, setTopseller] = useState(1)
    const changestatus = (index) => {
        setTopseller(index)
    }

    //button class
    const buttonclass = (index) => {
        return `${topseller === index ? "border-black" : "border-gray-300"} rounded-md transition border py-2  md:py-1 px-5`
    }
    return (
        <>
            <section className='container mx-auto mt-10'>
                <h1 className='text-center font-bold text-2xl tracking-wide'>Discover our top sellers</h1>
                <div className='flex justify-center gap-3 md:gap-10 mt-5'>

                    <button onClick={() => changestatus(1)} className={buttonclass(1)}>Promotion</button>
                    <button onClick={() => changestatus(2)} className={buttonclass(2)}>Limited</button>
                    <button onClick={() => changestatus(3)} className={buttonclass(3)}>Best Sellers</button>

                </div>

                <div className='flex items-center flex-col md:flex-row mt-4 gap-6 justify-center'>
                    <Items />
                    <Items />
                    <Items />

                </div>


            </section>
        </>

    )
}

export default Topseller