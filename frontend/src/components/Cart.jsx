/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CheckoutModal from './CheckoutModal';

const Cart = ({ initialCart, updateCart }) => {
  const [cart, setCart] = useState([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    const initializedCart = initialCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCart(initializedCart);
  }, [initialCart]);

  const removeItem = (indexToRemove) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
    updateCart(newCart); // Update the initialCart state in App.jsx
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    updateCart(newCart); // Update the initialCart state in App.jsx
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      updateCart(newCart); // Update the initialCart state in App.jsx
    }
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  }

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  }

  return (
    <div className='container mx-auto px-5 flex flex-col h-full'>
      <h1 className='text-xl md:text-3xl mb-3 text-center'>My Cart</h1>
      <hr className='mb-3 border-black'></hr>
      <div className='flex-grow overflow-y-auto max-h-80'>
        <ul className='list-inside'>
          {cart.map((item, index) => (
            <React.Fragment key={index}>
              <li className='flex justify-between items-center mb-2'>
                <div className='flex items-start'>
                  <img src={item.image} alt={item.name} className='w-32 object-cover mr-5' />
                  <div className='flex flex-col'>
                    <span className='text-2xl'>{item.name}</span>
                    <span className='text-gray-600 text-sm'>{item.description}</span>
                    <span className='mt-10 font-bold text-2xl'>R{item.price}</span>
                  </div>                
                </div>        
                <div className='flex items-center'>
                  <button onClick={() => decreaseQuantity(index)} className='mx-2'>
                    <FaMinus />
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(index)} className='mx-2'>
                    <FaPlus />
                  </button>
                  <button onClick={() => removeItem(index)} className='ml-5'>
                    <MdDelete />
                  </button>
                </div>
                <div>
                  <span className='font-semibold'>
                    R{!isNaN(Number(item.price)) ? (Number(item.price) * item.quantity).toFixed(2).toString() : '0.00'}
                  </span>
                </div>
              </li>
              {index < cart.length - 1 && <hr className='my-5 border-black' />}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className='flex justify-end mt-2'>
          <button 
            type='button'
            className='bg-[#2327FF] text-white px-7 py-1 rounded-lg'
            onClick={handleCheckout}
            >
              Checkout
          </button>     
      </div>
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={handleCloseCheckoutModal} cart={cart}/>
    </div>
  );
};

export default Cart;