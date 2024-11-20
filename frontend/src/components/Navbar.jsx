import React, { useState } from 'react';
import { GiDogHouse } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = ({ onSignInClick, isAuthenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-[#4A4A4A] p-5 border-b border-[#f2b543]'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link to='/'>
          <h1 className='text-2xl'>Jewels</h1>
        </Link>
      </div>
      <div className='block lg:hidden'>
        <button
          onClick={toggleMenu}
          className='flex items-center px-3 py-2 border rounded'
        >
          {isOpen ? <FaTimes className='text-white' /> : <FaBars className='text-white'/>}
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
        <ul className='lg:flex lg:justify-center lg:items-center lg:space-x-4 w-full'>
          <li className='block mt-4 lg:mt-0 text-white'>
            <a href="/">Home</a>
          </li>
          <li className='block mt-4 lg:mt-0 text-white'>
            <a href="/products">Products</a>
          </li>
          {/* <li className='block mt-4 lg:mt-0 text-black hover:text-green-500'>
            <a href="/contact">Contact Us</a>
          </li> */}
          {isAuthenticated ? (
            <li className='block mt-4 lg:mt-0 text-black'>
              <span>Welcome, {user.name}</span>
            </li>
          ) : (
            <li className='block mt-4 lg:mt-0'>
              <button onClick={onSignInClick} className='border px-2 py-2 text-white rounded-md'>
                Sign In
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};