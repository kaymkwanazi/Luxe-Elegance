import React from 'react'
import pic1 from '../images/pic2.jpg'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <div className='h-screen bg-cover bg-center relative flex flex-col items-center justify-center' 
        style={{backgroundImage: `url(${pic1})`}}>
            <div className='absolute bg-black bg-opacity-40 inset-0'></div>
            <div className='relative text-white'>
                <h1 className='font-bold text-7xl'>THE PET SHOP</h1>
                <p className='font-semibold text-center text-xl mt-5'>The best place to find your new best friend</p>
                <Link to='/products'>
                    <button className='border-2 py-3 px-4 mt-16 ml-36 hover:bg-slate-100 hover:text-black'>View Pets</button>
                </Link>
            </div>
      </div>
    </>
  )
}