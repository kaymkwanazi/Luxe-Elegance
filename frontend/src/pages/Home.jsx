import React from 'react'
import pic1 from '../images/hand with gold ring.jpg'
import aboutPic from '../images/aboutPic.jpg'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <div className='h-screen bg-cover bg-center relative flex flex-col items-center justify-center' 
        style={{backgroundImage: `url(${pic1})`}}>
            <div className='absolute bg-black bg-opacity-40 inset-0'></div>
            <div className='relative text-white text-center'>
                <h1 className='font-bold text-7xl'>Jewels</h1>
                <p className='font-semibold text-center text-xl mt-5'>Timeless Elegance, Crafted to Shine</p>
                <Link to='/products'>
                    <button className='border-2 py-3 px-4 mt-16 hover:bg-slate-100 hover:text-black'>View More</button>
                </Link>
            </div>
      </div>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            
        </div>
      </div>
    </>
  )
}