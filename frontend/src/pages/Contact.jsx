/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import contactBg from '../images/FIORI.webp'
import { FaPhone } from 'react-icons/fa'
import { MdLocationPin, MdOutlineMail } from 'react-icons/md'

export const Contact = () => {
  return (
   <>
    <div className ='min-h-96 bg-cover bg-center relative flex justify-center items-center'
        style={{backgroundImage: `url(${contactBg})`}}>
        <div className='absolute bg-black opacity-40 inset-0'></div>
        <div className='relative z=10 text-center'>
            <h1 className='text-white text-6xl'>Contact Us</h1>
        </div>
    </div>

    <div className='bg-[#808080] py-10'>
        <div className='container mx-auto px-4 grid cols-1 md:grid-cols-2 py-5'>
            <div className='relative mx-10 px-10'>
                <h2 className='text-white text-4xl font-semibold text-center'>Message Us</h2>
                <hr className='mx-auto my-4 w-16 border-t-2 border-[#FFD700] '></hr>
                <p className='text-white text-xl font-light text-center pb-10'>
                    Have questions or need assistance? Our team is here to help! Send us a message, and we`ll get back to you as soon as possible
                </p>
                <div className='flex flex-col gap-5 pb-5'>
                    <div className='flex items-center text-slate-100'>
                        <FaPhone size={28} className='mr-2' /> +27 11 565 7890
                    </div>
                    <div className='flex items-center text-slate-100'>
                        <MdOutlineMail size={28} className='mr-2' /> luxe@info.co.za
                    </div>
                    <div className='flex items-center text-slate-100'>
                        <MdLocationPin size={28} className='mr-2' /> 123 Main Street, Pretoria CBD
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className='bg-[#c7bb8e] relative md:-mt-28 z-20 py-10'>
                <div className='container mx-auto px-5 py-10'>
                    <form className='flex flex-col gap-4'>
                        <input type='text' placeholder='Enter your name' className='pl-3 py-2 rounded-sm'/>
                        <input type='email' placeholder='Enter your email' className='pl-3 py-2 rounded-sm'/>
                        <textarea placeholder='Enter your message' className='pl-3 py-2 rounded-sm h-32'></textarea>   
                    </form>
                    
                    <button type='submit' className='bg-white border border-black y-2 rounded-sm mt-10 px-2 py-2'>Send Message</button>
                </div>
          </div>

        </div>
        <div className='container mx-auto px-4 py-5 flex items-center justify-center'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.0629610939054!2d28.029332440617843!3d-26.19463007717786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1b6a46275f%3A0x57102a28136779dc!2s41%20Juta%20St%2C%20Braamfontein%2C%20Johannesburg%2C%202017!5e0!3m2!1sen!2sza!4v1738569665581!5m2!1sen!2sza" 
            width="1040" 
            height="450" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>

    </div>
  
   
   </>
  )
}
