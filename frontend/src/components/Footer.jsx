import React from 'react';
import { FaFacebook, FaFacebookF, FaInstagram, FaInstagramSquare, FaLinkedin, FaLinkedinIn, FaPinterest, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='fixed md:px-10 right-0 top-1/2 w-16 h-auto transform -translate-y-1/2  flex flex-col justify-end items-center'>
      <div className='gap-10 flex flex-col items-center md:mr-10'>
          <hr className='border-t border-[#f2b543] w-32 transform rotate-90 mb-16 mt-10' />
          <FaFacebookF size={32} className='text-slate-100' />
          <FaPinterestP size={32} className='text-slate-100 '/>
          <FaInstagram size={32} className='text-slate-100 '/>
          <FaLinkedinIn size={32} className='text-slate-100 '/>
          <hr className='border-t border-[#f2b543] w-32 transform rotate-90 mt-16' />
      </div>
    </div>
  );
};

export default Footer;