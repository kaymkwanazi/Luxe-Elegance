import React from 'react';

const Cart = ({ cart }) => {
  console.log("🚀 ~ Cart ~ cart:", cart)
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - R{item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;