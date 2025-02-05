/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AddProduct from '../components/addProduct';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [multipleSelected, setMultipleSelected] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedProducts(prevSelected => {
      const isSelected = prevSelected.includes(productId);
      const newSelected = isSelected
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId];

      setMultipleSelected(newSelected.length > 1);

      return newSelected;
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
        <div className='container mx-auto px-10 py-10'>
          <div className='flex justify-between'>
            <h1 className='text-4xl mb-10'>Product Inventory</h1>
            <div>
              <button
                  onClick={() => setIsModalOpen(true)}
                  className='bg-blue-500 text-white p-3 rounded'
                >
                  Add Product
              </button>
            </div>
             
          </div>
          <ul className='flex flex-col space-y-4'>
            {products.map(product => (
              <li key={product.id} className='flex items-center'>
                <input
                  type='checkbox'
                  onChange={() => handleCheckboxChange(product._id)}
                  className='mr-4'
                />
                <div>
                  <h2 className='text-xl'>{product.name}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} customStyles='w-1/4'>
        <AddProduct />
      </Modal>
    </div>
  );
};

export default AllProducts;