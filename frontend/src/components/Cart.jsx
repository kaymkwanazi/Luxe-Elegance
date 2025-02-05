import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Cart = ({ initialCart }) => {
  const [cart, setCart] = useState(initialCart);

  const removeItem = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  return (
    <div className='container mx-auto px-5 py-5'>
      <h1 className='font-semibold text-xl mb-3'>My Cart</h1>
      <hr className='mb-3 border-black'></hr>
      <ul className='list-inside'>
        {cart.map((item, index) => (
          <li key={index} className='flex justify-between items-center mb-2'>
            <div className='flex items-center'>
              <img src={item.image} alt={item.name} className='w-16 h-16 object-cover mr-4' />
              <div className='flex flex-col'>
                <span className='font-semibold'>{item.name}</span>
                <span className='text-gray-600'>{item.description}</span>
                <span className='mt-1'>R{item.price}</span>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;