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
import bgShop from '../images/FIORI.webp'
import bgAbout from '../images/FIORI.webp';


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
  const [itemsPerPage] = useState(12);
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

  return (
  <>
     <div className='min-h-96 bg-cover bg-center relative flex items-center justify-center' style={{backgroundImage: `url(${bgShop})`}}>
            <div className='absolute inset-0 bg-black opacity-40'></div>
            <div className='relative z-10 text-center'>
            <h1 className='text-6xl text-white'>Shop</h1>
            </div>
      </div>
    <div className="bg-[#808080] min-h-screen text-white">
      <h1 className="font-carattere text-6xl text-center pt-10">
       Elevate your Elegance
      </h1>
      <hr className='mx-auto my-4 w-16 border-t-2 border-[#FFD700] pb-5'></hr>
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 pb-5">
        {currentItems.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl w-52 shadow-md overflow-hidden cursor-pointer bg-slate-100 text-black"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-52 h-52 transform transition duration-300 hover:scale-110"
            />
            <div className="flex flex-col items-center m-5">
              <h4 className="text-md ">{product.name}</h4>
              <p className="font-bold">R{product.price}</p>
            </div>
           
              {/* {isAdmin ? (
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
              ) : ( */}
                {isAuthenticated && (
                  <div className="flex justify-center m-4">
                    {/* <button
                      className="bg-[#8cad20] px-2 py-1 rounded"
                      onClick={() => addToCart(product)}
                    >
                      <MdOutlineAddShoppingCart />
                    </button> */}
                  </div>
                )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className="mx-1 px-2 py-1 mb-5 rounded-lg text-white"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  </>
  );
};

export default Products;
