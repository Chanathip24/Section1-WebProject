import React, { useState, useEffect } from 'react'

const SubCarousel2 = () => {
    const [index, setIndex] = useState(0)

    //Go next Slide
    const NextSlide = () => {
        setIndex((prev) => {
            if (prev === 2 - 1) return 0 //จำนวน slide
            return prev + 1
        })
    }

    useEffect(() => {
        const myinterval = setInterval(() => {
            NextSlide()
        }, 5000)
        return () => clearInterval(myinterval)
    }, [])
    return (

        <section className='container mx-auto mt-5'>
            
            <div className='flex overflow-hidden'>
                <div className='flex flex-shrink-0 w-full justify-center items-center transition-all ease-in-out duration-700 flex-col h-[250px]' style={{translate : `${-100*index}%`}}>
                    <h1 className='text-center font-bold text-2xl md:text-5xl tracking-widest w-1/2 '>This is kumkom</h1>
                    <p className=''>CEO</p>
                </div>
                <div className='flex flex-shrink-0 w-full justify-center items-center transition-all ease-in-out duration-700 flex-col h-[250px]' style={{translate : `${-100*index}%`}}>
                    <h1 className='text-center font-bold text-2xl md:text-5xl tracking-widest w-1/2 '>This is kumkom</h1>
                    <p className=''>CEO</p>
                </div>
            </div>




        </section>

    )
}

export default SubCarousel2