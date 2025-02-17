import React from 'react'

export const ViewProduct = () => {
  return (
<>
    <div className='container mx-auto px-5'>
        <div className='grid cols-1 md:grid-cols-2 gap-5'>
            <div>

            </div>
            <div>
                <h1 className='text-3xl font-bold'>Product Name</h1>
                <p className='text-gray-600'>Product Description</p>
                <p className='text-2xl font-bold'>R 1000.00</p>
                <button className='bg-yellow-500 text-white p-2 rounded-md'>Add to cart</button>
            </div>

        </div>

    </div>
</>
    
  )
}
