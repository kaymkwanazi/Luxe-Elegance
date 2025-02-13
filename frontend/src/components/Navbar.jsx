/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-luxe.webp';
import { FaBars, FaTimes } from 'react-icons/fa';
import Modal from './Modal';
import { CiShoppingCart } from "react-icons/ci";
import Badge from '@material-ui/core/Badge';
import cart from '../images/cart-1.png';
import { MdAccountCircle } from 'react-icons/md';
import Cart from './Cart';

const Navbar = ({ isAuthenticated, user, onSignInClick, isPopUpVisible, handleItemClick, togglePopUp, onAddProductClick, cart=[]}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  }

  return (
    <nav className="p-4 border-b border-yellow-500 absolute top-0 left-0 w-full z-50
    ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white px-3 py-2 pl-10 rounded-md text-sm font-medium italic"><img src={logo} width={50} className='rounded-full'></img></Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded"
          >
            {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
          <ul className="lg:flex lg:justify-center lg:items-center lg:space-x-10 w-full">
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
           
            {isAuthenticated ? (
              <>
                <li className="relative block mt-4 lg:mt-0 text-white hover:font-bold">
                  <button
                    onClick={togglePopUp}
                    className="flex items-center px-3 py-2 rounded-md focus:outline-none "
                  >
                    <MdAccountCircle size={32} />
                  </button>
                  {isPopUpVisible && (
                    <div className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { handleItemClick(); }} >Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { handleItemClick(); }}>Settings</Link>
                      <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { handleItemClick(); }}>Sign Out</Link>
                    </div>
                  )}
                </li>

              {isAuthenticated && (
                <li className="block mt-4 lg:mt-0 text-white">
                  <button onClick={toggleCartModal} className="flex items-center px-3 py-2 rounded-md focus:outline-none">
                    <Badge badgeContent={cart.length} color="primary">
                      <CiShoppingCart className="text-white" size={24} />
                    </Badge>
                  </button>
                </li>
              )}
              </>
            ) : (
              <li className="block mt-4 lg:mt-0">
                <button onClick={onSignInClick} className="border py-2 px-2 text-xs text-white">
                  Sign In
                </button>
              </li>
            )}
            </ul>
          </div>
      </div>

      <Modal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} customStyles="w-1/2">
        <Cart initialCart={cart} />
      </Modal>
      
    </nav>
  );
};


export default Navbar;