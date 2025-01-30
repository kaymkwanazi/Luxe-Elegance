/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-luxe.webp';
import { FaBars, FaTimes } from 'react-icons/fa';
import AddProduct from './addProduct';
import Modal from './Modal';
import { CiShoppingCart } from "react-icons/ci";
import Badge from '@material-ui/core/Badge';
import cart from '../images/cart-1.png';
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({ isAuthenticated, user, onSignInClick, isPopUpVisible, handleItemClick, togglePopUp, onAddProductClick, cart=[]}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="bg-[#494949] p-4 border-b border-yellow-500">
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
              {/* Button For adding products */}
              {user.isAdmin && (
                <li className="relative block mt-4 lg:mt-0 text-white">
                  <button
                    className="flex items-center px-3 py-2 rounded-md focus:outline-none"
                    onClick={onAddProductClick}
                  >
                   Add Product
                  </button>
                </li>
              )}

              {isAuthenticated && (
                <li className="block mt-4 lg:mt-0 text-white">
                  <Badge badgeContent={cart.length} color="primary">
                    <CiShoppingCart className="text-white" size={24} />
                  </Badge>
                </li>
              )}
              </>
            ) : (
              <li className="block mt-4 lg:mt-0">
                <button onClick={onSignInClick} className="bg-white border py-1 px-2 text-xs rounded-md font-semibold">
                  Sign In
                </button>
              </li>
              
            )}
          </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProduct />
      </Modal>
      
    </nav>
  );
};

export default Navbar;