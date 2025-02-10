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
                  className='border border-black hover:bg-slate-300 p-2'
                >
                  Add Product
              </button>
            </div>
             
          </div>
          <div>
          <table className='min-w-full bg-white border border-gray-300 rounded-lg'>
              <thead className='bg-slate-200'>
                <tr>
                  <th className='py-2 px-4 border border-gray-300'>Select</th>
                  <th className='py-2 px-4 border border-gray-300'>Product Name</th>
                  <th className='py-2 px-4 border border-gray-300'>Description</th>
                  <th className='py-2 px-4 border border-gray-300'>Category</th>
                  <th className='py-2 px-4 border-b border border-gray-300'>Price</th>
                  <th className='py-2 px-4 border-b border border-gray-300'>Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td className='py-2 px-4 border border-gray-300'>
                      <div className='flex justify-center items-center'>
                          <input
                            type='checkbox'
                            onChange={() => handleCheckboxChange(product._id)}
                          />
                      </div>
                    </td>
                    <td className='py-2 px-4 border border-gray-300'>{product.name}</td>
                    <td className='py-2 px-4 border border-gray-300'>{product.description}</td>
                    <td className='py-2 px-4 border border-gray-300'>{product.category}</td>
                    <td className='py-2 px-4 border border-gray-300'>R{product.price}</td>
                    <td className='py-2 px-4 border-b border-r border border-gray-300'>{product.price}</td>  {/*  //Add actions here */}
                   
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} customStyles='w-1/2'>
        <AddProduct />
      </Modal>
    </div>
  );
};

export default AllProducts;