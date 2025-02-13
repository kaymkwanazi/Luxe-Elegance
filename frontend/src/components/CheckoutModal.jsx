import React from 'react';
import { FaTimes } from 'react-icons/fa';

const CheckoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[700px] h-[700px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>
        <h2 className="text-3xl mb-4 font-bold">Checkout</h2>
        {/* Checkout form goes here */}
        <div className='container mx-auto px-4 grid grid-cols-2 my-10'>
            <div className='flex flex-col border-r border-r-black'>
                <h1 className='text-center font-medium'>Shipping Information</h1>
                <form className='p-5'>
                    <p className='p-2'>Full Name</p>
                    <input type='text' required className='border border-gray-300 p-2 rounded-lg mb-3' />
                    <p className='p-2'>Email Address</p>
                    <input type='text'required className='border border-gray-300 p-2 rounded-lg mb-3' />
                    <p className='p-2'>Phone Number</p>
                    <input type='text' required className='border border-gray-300 p-2 rounded-lg mb-3' />
                    <p className='p-2'>Shipping Address</p>
                    <textarea type='text' required className='border border-gray-300 p-2 rounded-lg mb-3 w-52 ' />
                </form>
            </div>
            <div>
                <h1 className='text-center font-medium'>Payment Information</h1>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;