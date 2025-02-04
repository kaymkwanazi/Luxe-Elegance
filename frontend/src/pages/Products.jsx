/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from '../components/Modal';
import UpdateProduct from '../components/UpdateProduct';
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit , MdOutlineAddShoppingCart} from "react-icons/md";
import { useLocation } from 'react-router-dom';


export const Products = ({ products: initialProducts, isAdmin, addToCart, isAuthenticated}) => {
  const location = useLocation();
  const selectedCategory = location.state?.category || '';

  const [products, setProducts] = useState(
    selectedCategory ? initialProducts.filter(product => product.category === selectedCategory) : initialProducts
  );
  
  useEffect(() => {
    if (!selectedCategory) {
      setProducts(initialProducts);
    } else {
      setProducts(initialProducts.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, initialProducts]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = products.slice(firstItem, lastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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
      .then(response => response.json())
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
        console.error('Error deleting product:', error);
        Swal.fire(
          'Error!',
          'There was a problem deleting the product.',
          'error'
        );
      });
      }
    });
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
  };

  return (
    <div className="bg-[#494949] min-h-screen text-white">
      <h1 className="font-bod text-4xl text-center pt-10">
        Browse Our Exquisite Jewelry Collection
      </h1>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 pb-10">
        {currentItems.map((product) => (
          <div
            key={product._id}
            className="rounded-lg w-52 shadow-md overflow-hidden cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-52 h-52 transform transition duration-300 hover:scale-110"
            />
            <h4 className="text-lg font-bold mt-10 m-2">{product.name}</h4>
            <p className="m-4">R{product.price}</p>
              {isAdmin ? (
                <div className="flex justify-between m-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(product)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => handleUpdate(product)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                </div>
              ) : (
                isAuthenticated && (
                  <div className="flex justify-center m-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => addToCart(product)}
                    >
                      <MdOutlineAddShoppingCart />
                    </button>
                  </div>
                )
              )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className="mx-1 px-3 py-1 mb-5 bg-blue-500 rounded-lg text-white"
          >
            {number}
          </button>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UpdateProduct product={selectedProduct} onUpdateProduct={handleUpdateProduct} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Products;
