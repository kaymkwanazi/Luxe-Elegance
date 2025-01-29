/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaFacebookF, FaInstagram, FaInstagramSquare, FaLinkedin, FaLinkedinIn, FaPinterest, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logo from '../images/logo-luxe.webp'
const Footer = () => {
  return (
   <>
   <div className='bg-[#515151] border-t-2 border-t-yellow-400 py-10'>
    <div className='container mx-auto px-4 grid cols-1 md:grid-cols-3'>
      <div>
        <img src={logo} width={62} className='rounded-full'></img>
      </div>
      <div className='flex flex-col gap-4'>
          <h2 className='text-white text-md font-semibold'>Contact Us</h2>
          <p className='text-slate-100'>Email: info@example.com</p>
          <p className='text-slate-100'>Phone: (123) 456-7890</p> 
          <p className='text-slate-100'>123 Main St, City, State, Zip</p>     

      </div>
      <div className='flex flex-col justify-end space-y-5'>
        <div className='flex mb-10'>
          <ul className="lg:flex lg:justify-center lg:items-center lg:space-x-10 w-full">
              <li className="block mt-4 lg:mt-0 text-white">
                <Link to="/">Home</Link>
              </li>
              <li className="block mt-4 lg:mt-0 text-white">
                <Link to="/products">Shop</Link>
              </li>
              <li className="block mt-4 lg:mt-0 text-white">
                <Link to="/about">About</Link>
              </li>
              <li className="block mt-4 lg:mt-0 text-white">
                <Link to="/contact">Contact us</Link>
              </li>
          </ul>
        </div>
          <h2 className='text-white font-semibold text-xl text-center'>Follow us</h2>
          <div className='flex justify-center gap-10'>
            <FaFacebookF size={32} className='text-slate-100' />
            <FaPinterestP size={32} className='text-slate-100' />
            <FaInstagram size={32} className='text-slate-100' />
            <FaLinkedinIn size={32} className='text-slate-100' />
          
        </div>
      </div>
    </div>
    <p className='text-white text-center mt-5'>Copyright reserved.</p>   
   </div>
   </>
  );
};

export default Footer;