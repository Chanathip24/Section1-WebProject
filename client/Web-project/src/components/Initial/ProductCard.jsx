import React from 'react'

const Items = () => {
  return (
    <div className='w-80  sm:w-1/2 md:w-60  p-4'>
      <div className='topcard relative rounded-xl'>
        <div className=' rounded-xl  absolute bottom-0 flex justify-center w-full'>
          <button className='buybutton transition opacity-0 text-white w-10/12 rounded-lg py-2 mb-4' style={{background:"#37c567" }}><span >Buy</span></button>
        </div>
        <img className='rounded-xl  hover:cursor-pointer' src="https://s3.amazonaws.com/www-inside-design/uploads/2018/12/The-product-of-you-810x810.png" alt="" width={400} />
      </div>

      <h1 className='font-bold my-2'>product_name</h1>
      <p className=''>฿24.00</p>
      <p className='truncate text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis hic id veritatis non quisquam temporibus, obcaecati voluptas, facere porro corporis molestiae laborum perferendis sunt. Praesentium repellendus doloribus rerum nemo doloremque.</p>
    </div>
  )
}

export default Items