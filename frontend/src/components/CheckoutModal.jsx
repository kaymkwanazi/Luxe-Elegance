import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const CheckoutModal = ({ isOpen, onClose, cart = [], openCartModal }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate('/products');
  };

  const handleBackToCart = () => {
    onClose();
    openCartModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[900px] max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>
        <h2 className="text-3xl mb-4 font-bold">Checkout</h2>
        <div className='container mx-auto px-4 grid grid-cols-2 gap-4'>
          <div className='flex flex-col border-r border-r-black'>
            <h1 className='text-center font-medium'>Shipping Information</h1>
            <form className='p-5'>
              <p className='p-2'>Full Name</p>
              <input type='text' required className='border border-gray-300 p-2 rounded-lg mb-3' />
              <p className='p-2'>Email Address</p>
              <input type='text' required className='border border-gray-300 p-2 rounded-lg mb-3' />
              <p className='p-2'>Phone Number</p>
              <input type='text' required className='border border-gray-300 p-2 rounded-lg mb-3' />
              <p className='p-2'>Shipping Address</p>
              <textarea type='text' required className='border border-gray-300 p-2 rounded-lg mb-3 w-full h-32' />
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
                <>
                  <div className='overflow-y-auto max-h-[400px]'>
                    <ul className='mb-5'>
                      {cart.map((item, index) => (
                        <li key={index} className='flex border-gray-300 p-2'>
                          <img src={item.image} alt={item.name} width={100} />
                          <div className='flex flex-col mx-5'>
                            <p>{item.name}</p>
                            <p className='font-light text-xs text-gray-400 mb-5'>{item.quantity}x</p>
                            <p className='font-bold'>R{item.price * item.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* discount promo code */}
                  <div className='relative flex items-center p-2'>
                    <input type='text' placeholder='Discount code' className='border border-gray-300 p-2 rounded-lg w-full' />
                    <button className='absolute right-2 text-[#2327FF] font-bold py-1 px-3 rounded-lg'>Apply</button>
                  </div>
                  {/* Total */}
                  <div className='flex flex-col justify-between mt-5'>
                    <div className='flex justify-between'>
                      <p>Subtotal</p>
                      <p>R{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                      <p>Discount</p>
                      <p>R0</p> {/* Replace with actual discount logic if available */}
                    </div>
                    <div className='flex justify-between font-semibold text-2xl mt-3'>
                      <p>Total</p>
                      <p>R{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                    </div>
                  </div>
                  <div className='flex justify-center mt-3'>
                    <button className='bg-[#2327FF] text-white px-7 py-1 rounded-lg mt-5'>Proceed to Payment</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <button onClick={handleBackToCart} className=' text-gray-600'><IoIosArrowBack size={24} /></button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;