/* eslint-disable no-unused-vars */
import React from 'react'
import bgAbout from '../images/FIORI.webp'
import aboutPic from '../images/download.jpg'
import aboutpIC2 from '../images/bg-03.jpg'

export const About = () => {
  return (
    <>
        <div className='min-h-96 bg-cover bg-center relative flex items-center justify-center' style={{backgroundImage: `url(${bgAbout})`}}>
            <div className='absolute inset-0 bg-black opacity-40'></div>
            <div className='relative z-10 text-center'>
            <h1 className='text-6xl text-white'>About Us</h1>
            <p className='text-white text-2xl pt-5'>Our Story: Inspired by beauty, Perfected by craft</p>
            </div>
        </div>

        <div className='bg-[#808080]'>
            <div className='container mx-auto px-4 py-10 grid cols-1 md:grid-cols-2'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-white font-carattere text-4xl md:text-6xl text-center '>Crafted with Prescicion and Passion</h2>
                    <hr className='mx-auto my-4 w-16 border-t-2 border-[#FFD700] '></hr>
                    <p className='text-white md:text-xl md:font-light text-center'>
                        At Luxe Elegance, each piece of jewellery is a masterpiece, meticulously handcrafted by skilled artisans who pour their passion and expertise into every detail. 
                        We source only the finest materials, from ethically mined gemstones to premium metals, ensuring that every creation is as sustainable as it is stunning. 
                        Our designs are inspired by timeless elegance and modern sophistication, blending artistry and innovation to create jewellery that transcends trends. 
                        With a commitment to exceptional craftsmanship, every piece tells a story of beauty, precision, and luxury—made to be cherished for generations.
                    </p>
                </div>
                <div className='flex items-center justify-center'>
                    <img src={aboutPic} alt='About Pic' className='object-cover w-1/2 '/>

                </div>

            </div>

            <div className='container mx-auto px-4 pb-20'>
                <img src={aboutpIC2 } className='w-full h-full object-cover'/>
            </div>
        </div>  
      
    </>
  )
}