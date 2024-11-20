import React from 'react'
import pic1 from '../images/pic2.jpg'
import aboutPic from '../images/aboutPic.jpg'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <div className='h-screen bg-cover bg-center relative flex flex-col items-center justify-center' 
        style={{backgroundImage: `url(${pic1})`}}>
            <div className='absolute bg-black bg-opacity-40 inset-0'></div>
            <div className='relative text-white text-center'>
                <h1 className='font-bold text-7xl'>THE PET SHOP</h1>
                <p className='font-semibold text-center text-xl mt-5'>The best place to find your new best friend</p>
                <Link to='/products'>
                    <button className='border-2 py-3 px-4 mt-16 hover:bg-slate-100 hover:text-black'>View Pets</button>
                </Link>
            </div>
      </div>
      <div className='container mx-auto px-4 my-10'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='overflow-hidden'>
                <img src={aboutPic} alt='about' className='w-full h-full object-cover' style={{ objectFit: 'cover', height: '100%' }} />
            </div>
        </div>
      </div>
    </>
  )
}