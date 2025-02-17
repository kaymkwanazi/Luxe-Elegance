import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutModal = ({ isOpen, onClose, cart = [], openCartModal }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate('/products');
  }

  const handleBackToCart = () => {
    onClose();
    openCartModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
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
                <h1 className='text-center font-medium'>Review Cart</h1>
                <div className='p-5'>
                  {cart.length === 0 ? (
                    <div>
                      <p className='text-3xl mb- font-bold'>Your cart is empty</p>
                      <p className='text-3xl mb-5 font-bold'>Let's start a new order!</p>
                      <div className='flex justify-center mt-10'>
                        <button onClick={handleContinueShopping} className="bg-blue-500 rounded-full px-4 py-2 text-white">Continue shopping</button>
                      </div>
                    </div>
                  ) : (
                    <div className='overflow-y-auto max-h-96'>
                      <ul className='mb-5'>
                        {cart.map((item, index) => (
                          <li key={index} className='flex border-b border-gray-300 p-2'>
                            <img src={item.image} alt={item.name} width={100} />
                            <div className='flex flex-col mx-5'>
                              <p>{item.name}</p>
                              <p className='font-light text-xs text-gray-400 mb-5'>{item.quantity}x</p>
                              <p className='font-bold'>R{item.price * item.quantity}</p>
                            </div>
                            
                          </li>
                        ))}
                      </ul>
                      <div className='relative flex items-center'>
                        <input type='text' placeholder='Promo code' className='border border-gray-300 p-2 rounded-lg w-full' />
                        <button className='absolute right-2 text-[#2327FF] font-bold px-3 rounded-lg'>Apply</button>
                      </div>
                    </div>
                  )}

                </div>
            </div>
        </div>
        <div>
          <button onClick={handleBackToCart} className='bg-[#2327FF] text-white px-7 py-1 rounded-lg'>Back to cart</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;