import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, user, onSignInClick, isPopUpVisible, handleItemClick, togglePopUp}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-[#494949] p-4 border-b border-yellow-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium italic">JEWELS</Link>
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
          <ul className="lg:flex lg:justify-center lg:items-center lg:space-x-4 w-full">
            <li className="block mt-4 lg:mt-0 text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="block mt-4 lg:mt-0 text-white">
              <Link to="/products">Products</Link>
            </li>
            {isAuthenticated ? (
              <>
              <li className="relative block mt-4 lg:mt-0 text-white">
                <button
                  onClick={togglePopUp}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                >
                  Account
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
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                  >
                    Add Product
                  </button>
                  
                </li>
              )}
              </>
            ) : (
              <li className="block mt-4 lg:mt-0">
                <button onClick={onSignInClick} className="border px-2 py-2 text-white rounded-md">
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* {isAuthenticated && <span className='text-white text-center'>Welcome, {user.name}</span>} */}
    </nav>
  );
};

export default Navbar;