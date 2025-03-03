/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AddProduct from '../components/addProduct';
import Swal from 'sweetalert2';
import UpdateProduct from '../components/UpdateProduct';

const AllProducts = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortConfig.key) {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return -1 * direction;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return 1 * direction;
      }
      return 0;
    }
    return 0;
  });

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(firstItem, lastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAddProduct = (product) => {
    setIsAddModalOpen(true);
    setIsUpdateModalOpen(false);
  };

  const newAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const uniqueCategories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className={`flex-1 border-t-2 ${theme === 'dark' ? 'bg-[#494949]' : 'bg-[#EEDAEA]'}`}>
        {/* Header */}
        <AdminNavbar />
        {/* Products list */}
        <div className='container mx-auto px-10'>
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
          <div className='flex mb-4'>
            <input
              type='text'
              placeholder='Search by name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-md'
            />
            <button 
              onClick={() => setSearchTerm('')}
              className='ml-2 px-4 py-1 border border-black hover:bg-slate-300'>
                Clear
            </button>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className='ml-4 px-4 py-2 border border-gray-300 rounded-md'
            >
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-300 rounded-lg table-auto'>
              <thead className='bg-slate-200'>
                <tr>
                  <th className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>Select</th>
                  <th className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer'
                    onClick={() => handleSort('name')}>
                    Product Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer'
                    onClick={() => handleSort('description')}>
                    Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>Category</th>
                  <th className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>Price</th>
                  <th className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(product => (
                  <tr key={product._id}>
                    <td className='py-2 px-4 border border-gray-300'>
                      <div className='flex justify-center items-center'>
                        <input
                          type='checkbox'
                          onChange={() => handleCheckboxChange(product._id)}
                        />
                      </div>
                    </td>
                    <td className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>{product.name}</td>
                    <td className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>
                      <div className='flex items-center'>
                        <img src={product.image} alt={product.name} className='w-10 h-10 object-cover mr-2' />
                        <span>{product.description}</span>
                      </div>
                    </td>
                    <td className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>{product.category}</td>
                    <td className='py-2 px-2 border border-gray-300 text-xs sm:text-sm md:text-base whitespace-nowrap'>R{product.price}</td>
                    <td className='py-2 px-2 border border-gray-300'>
                      <div className='flex justify-center items-center space-x-2 sm:space-x-'>
                        <button onClick={() => handleUpdate(product)} className='text-blue-500 mx-1 sm:mx-2'>
                          <i className='fas fa-edit'></i>
                        </button>
                        <button onClick={() => handleDelete(product)} className='text-red-500 mx-1 sm:mx-2'>
                          <i className='fas fa-trash'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className='flex justify-center items-center space-x-2 mt-5'>
              {pageNumbers.map(number => (
                <button key={number} onClick={() => handlePageChange(number)}
                className='py-2 px-3 leading-tight border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700'>
                  {number}
                </button>
              ))}
            </div>
        </div>     
      </main>
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} customStyles='w-1/2'>
          <AddProduct newAddProduct={newAddProduct} />
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