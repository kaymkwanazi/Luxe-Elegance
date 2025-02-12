/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AddProduct from '../components/addProduct';
import Swal from 'sweetalert';
import UpdateProduct from '../components/UpdateProduct';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [multipleSelected, setMultipleSelected] = useState(false);
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);


  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = products.slice(firstItem, lastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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

  const handleAddProduct = (product) => {
    setIsAddModalOpen(true);
    setIsUpdateModalOpen(false);
  };

  const handleDelete = (product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/products/${product._id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setProducts(products.filter(p => p._id !== product._id));
            Swal.fire(
              'Deleted!',
              `${product.name} has been deleted.`,
              'success'
            );
          } else {
            Swal.fire(
              'Error!',
              `There was a problem deleting the product: ${data.message}`,
              'error'
            );
          }
        })
        .catch(error => {
          Swal.fire(
            'Error!',
            `There was a problem deleting the product: ${error.message}`,
            'error'
          );
        });
      }
    });
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
    setIsAddModalOpen(false);
  };
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
    setIsUpdateModalOpen(false);
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
        <div className='container mx-auto px-10 py-5'>
          <div className='flex justify-between'>
            <h1 className='text-4xl mb-10'>Product Inventory</h1>
            <div>
              <button type='submit'
                  onClick={handleAddProduct}
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
                    <td className='py-2 px-4 border-b border-r border border-gray-300'>
                      <div className='flex justify-center items-center'>
                          <button onClick={() => handleUpdate(product)} className='text-blue-500 mx-2'>
                              <i className='fas fa-edit'></i>
                          </button>
                          <button onClick={() => handleDelete(product)} className='text-red-500 mx-2'>
                            <i className='fas fa-trash'></i>
                          </button>
                      </div>
                      </td>  
                   
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <div className="flex justify-center">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className="gap-2"
                >
                  {number}
                </button>
              ))}
            </div>
        </div>     
      </main>
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} customStyles='w-1/2'>
          <AddProduct />
        </Modal>
      )}
      {isUpdateModalOpen && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} customStyles='w-1/2'>
          <UpdateProduct product={selectedProduct} onUpdateProduct={handleUpdateProduct} onClose={() => setIsUpdateModalOpen(false)} />
        </Modal>
      )}

    </div>
  );
};

export default AllProducts;