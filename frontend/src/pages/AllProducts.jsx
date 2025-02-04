/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts(prevSelectedProducts => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter(id => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className='flex-1 bg-[#EEDAEA]'>
        {/* Header */}
        <AdminNavbar />
        {/* Products list */}
        <div className='container mx-auto px-5 py-10'>
          <h1 className='text-2xl mb-5 font-semibold'>All Products</h1>
          <ul className='flex flex-col space-y-4'>
            {products.map(product => (
              <li key={product.id} className='flex items-center '>
                <input
                  type='checkbox'
                  className='mr-4'
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
                <div>
                  <h2 className='text-xl '>{product.name}</h2>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AllProducts;