/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaFacebookF, FaInstagram, FaInstagramSquare, FaLinkedin, FaLinkedinIn, FaPhone, FaPinterest, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logo from '../images/logo-luxe.webp'
import { MdLocationPin, MdOutlineMail } from 'react-icons/md';
const Footer = () => {
  return (
   <>
   <div className='bg-[#515151] border-t-2 border-t-yellow-400 py-5'>
    <div className='container mx-auto px-4 grid cols-1 md:grid-cols-2'>
      <div className='flex gap-16'>
        <div>
          <img src={logo} width={62} className='rounded-full'></img>
        </div>        
          <div className='flex flex-col gap-5'>
            <h2 className='text-white font-bold'>Contact Us</h2>
            <div className='flex items-center text-slate-100'>
              <FaPhone size={28} className='mr-2' /> (123) 456-7890
            </div>
            <div className='flex items-center text-slate-100'>
              <MdOutlineMail size={28} className='mr-2' /> luxe@info.co.za
            </div>
            <div className='flex items-center text-slate-100'>
              <MdLocationPin size={28} className='mr-2' /> 123 Main Street, Pretoria CBD
            </div>
          </div>
      </div>
     
      <div className='flex flex-col space-y-5'>
        <div className='flex mb-10'>
          <ul className="lg:flex lg:justify-center lg:items-center lg:space-x-16 w-full">
              <li className="block mt-4 lg:mt-0 text-white hover:font-bold">
                <Link to="/">Home</Link>
              </li>
              <li className="block mt-4 lg:mt-0 text-white hover:font-bold">
                <Link to="/products">Shop</Link>
              </li>
              <li className="block mt-4 lg:mt-0 text-white hover:font-bold">
                <Link to="/about">About</Link>
              </li>
              <li className="block mt-4 lg:mt-0 text-white hover:font-bold">
                <Link to="/contact">Contact us</Link>
              </li>
          </ul>
        </div>
          <h2 className='text-white font-semibold text-xl text-center'>Follow us</h2>
          <div className='flex justify-center gap-10 '>
            <FaFacebook size={32} className='text-slate-100' />
            <FaPinterestP size={32} className='text-slate-100' />
            <FaInstagram size={32} className='text-slate-100' />
            <FaLinkedinIn size={32} className='text-slate-100' />
          
        </div>
      </div>
    </div>
    <p className='text-white text-center mt-10'>Copyright reserved.</p>   
   </div>
   </>
  );
};

export default Footer;