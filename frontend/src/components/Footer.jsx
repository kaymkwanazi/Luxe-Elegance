/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCopyright, FaFacebook, FaFacebookF, FaInstagram, FaInstagramSquare, FaLinkedin, FaLinkedinIn, FaPhone, FaPinterest, FaPinterestP, FaRegCopyright, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logo from '../images/logo-luxe.webp'
import { MdLocationPin, MdOutlineMail } from 'react-icons/md';
import  facebook from '../images/facebook.png'
import instagram from '../images/instagram.png'
import twitter from '../images/twitter.png'
import pinterest from '../images/pinterest.png'
import youtube from '../images/youtube.png'


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top:0, behavior: 'smooth' });
  }
  return (
   <>
   <div className='bg-[#515151] border-t-2 border-t-yellow-400 py-5'>
    <div className='container mx-auto px-4 grid cols-1 md:grid-cols-2'>
      <div className='flex gap-16'>
        <div>
          <img src={logo} width={62} className='rounded-full'></img>
        </div>        
          <div className='flex flex-col gap-5'>
            <h2 className='text-white font-semibold text-xl text-center'>Follow us</h2>
              <div className='flex  gap-5'>
                <img src={facebook} alt="Facebook" width={30} className='cursor-pointer'/>
                <img src={instagram} alt="Instagram" width={30} className='cursor-pointer'/>
                <img src={twitter} alt="Twitter" width={30} className='cursor-pointer'/>
                <img src={pinterest} alt="Pinterest" width={30} className='cursor-pointer'/>
              
            </div>
          </div>
      </div>
     
      <div className='flex flex-col space-y-5'>
        {/* <div className='flex mb-10'>
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
        </div> */}
        <div className='flex justify-center'>
          <button 
            onClick={scrollToTop} 
            className='text-white p-2  transition duration-300'
            aria-label="Scroll to top"
          >
               Back to top
          </button>
        </div>       
      </div>
    </div>
    <p className='text-white text-center mt-10'><FaRegCopyright className='inline size-3'/> Luxe Elegance. All rights reserved.</p>   
   </div>
   </>
  );
};

export default Footer;