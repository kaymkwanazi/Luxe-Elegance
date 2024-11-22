import React, { useState } from 'react';

const Product = ({ product }) => (
  <div key={product._id}>
    <h2>{product.name}</h2>
    <img src={product.image} alt={product.name} />
    <p>${product.price}</p>
  </div>
);

export const Products = () => {
  const initialProducts = [
    {
      _id: '1',
      name: 'Radient Stud Earings',
      image: 'https://demo3.joomshaper.com/2023/jewels/images/easystore/product-41/jewels-tmpl-product-img-16.webp',
      price: 729.99,
    },
    {
      _id: '2',
      name: 'Tudor Black Bay Fifty-Eight 925 Watch',
      image: 'https://demo3.joomshaper.com/2023/jewels/images/easystore/product-42/jewels-tmpl-product-img-12.webp',
      price: 899.99,
    },
    {
      _id: '3',
      name: 'Nubia Earrings Gold',
      image: 'https://demo3.joomshaper.com/2023/jewels/images/easystore/product-37/jewels-tmpl-product-img-30.webp',
      price: 360.99,
    },
    {
      _id: '4',
      name: 'Sovereign Cuff Bracelet',
      image: 'https://demo3.joomshaper.com/2023/jewels/images/easystore/product-39/jewels-tmpl-product-img-14.webp',
      price: 399.99,
    },
    {
      _id: '5',
      name: 'Nameplate Necklace',
      image: 'https://demo3.joomshaper.com/2023/jewels/images/easystore/product-34/jewels-tmpl-product-img-17.webp',
      price: 199.99,
    },
    {
        _id: '6',
        name: 'Pandora Moments Snake Chain Bracelet',
        image: 'https://demo3.joomshaper.com/2023/jewels/images/easystore/product-36/jewels-tmpl-product-img-18.webp',
        price: 299.99,
    }
  ];

  const [products, setProducts] = useState(initialProducts);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(14);
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = products.slice(firstItem, lastItem);
    const pageNumbers =[];
    for ( let i = 1; i <= Math.ceil(products.length/itemsPerPage); i++)
    {
        pageNumbers.push(i);
    }
  return (
    <>
      <div className=' bg-[#494949] w-11/12 text-white'>
        <h1 className='font-bod text-4xl text-center  pt-10'>Browse through our beautiful collection</h1>
        
        <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 pb-10'>
        {products.map((product) => (
            <div key={product._id} className='rounded-lg w-52   shadow-md overflow-hidden cursor-pointer'>
                <img src={product.image} alt={product.name} className=' object-cover transform transition duration-300 hover:scale-110' />
                <h4 className='text-xl font-bold mt-10 m-2'>{product.name}</h4>
                <p className=' m-4'>R{product.price}</p>
                </div>
            ))}

        </div> 

        <div className='container mx-auto px-96'>
            <div className='flex justify-evenly text-gray-600 font-semibold mx-56 mt-8 pb-8 px-3'>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => setCurrentPage(number)}
                    className={`text-sm p-2 rounded-md border ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
        </div>


    </>
  );
};