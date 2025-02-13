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
      <h1 className='text-xl md:text-3xl mb-3 text-center'>My Cart</h1>
      <hr className='mb-3 border-black'></hr>
      <div className='overflow-y-auto max-h-96'>
        <ul className='list-inside'>
          {cart.map((item, index) => (
            <React.Fragment key={index}>
              <li className='flex justify-between items-center mb-2'>
                <div className='flex items-start'>
                  <img src={item.image} alt={item.name} className='w-32 object-cover mr-5' />
                  <div className='flex flex-col'>
                    <span className='font-semibold'>{item.name}</span>
                    <span className='text-gray-600 text-sm'>{item.description}</span>
                    <span className='mt-1 font-semibold'>R{item.price}</span>
                    
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
                  <span className='font-semibold'>R{item.price * item.quantity}</span>
                </div>
              </li>
              {index < cart.length - 1 && <hr className='my-3 border-black' />}
            </React.Fragment>
          ))}
        </ul>
      </div>  
    </div>
    
  );
};

export default Cart;