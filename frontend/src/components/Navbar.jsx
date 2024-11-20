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
    <nav className='flex items-center justify-between flex-wrap bg-slate-300 p-5'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link to='/'>
          <h1 className='text-2xl text-black'>PET SHOP</h1>
        </Link>
      </div>
      <div className='block lg:hidden'>
        <button
          onClick={toggleMenu}
          className='flex items-center px-3 py-2 border rounded text-black border-black hover:text-green-500 hover:border-green-500'
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
        <ul className='lg:flex lg:justify-center lg:items-center lg:space-x-4 w-full'>
          <li className='block mt-4 lg:mt-0 text-black hover:text-green-500'>
            <a href="/">Home</a>
          </li>
          <li className='block mt-4 lg:mt-0 text-black hover:text-green-500'>
            <a href="/about">About Us</a>
          </li>
          <li className='block mt-4 lg:mt-0 text-black hover:text-green-500'>
            <a href="/products">Products</a>
          </li>
          <li className='block mt-4 lg:mt-0 text-black hover:text-green-500'>
            <a href="/contact">Contact Us</a>
          </li>
          {isAuthenticated ? (
            <li className='block mt-4 lg:mt-0 text-black'>
              <span>Welcome, {user.name}</span>
            </li>
          ) : (
            <li className='block mt-4 lg:mt-0'>
              <button onClick={onSignInClick} className='py-2 px-4 bg-green-500 text-white rounded-md'>
                Sign In
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};