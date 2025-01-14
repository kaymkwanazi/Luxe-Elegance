import React, { useState, useEffect } from "react";

const Product = ({ product }) => (
  <div key={product._id}>
    <h2>{product.name}</h2>
    <img src={product.image} alt={product.name} />
    <p>${product.price}</p>
  </div>
);

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(14);
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = products.slice(firstItem, lastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-[#494949] w-11/12 text-white">
        <h1 className="font-bod text-4xl text-center pt-10">
          Browse through our beautiful collection
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
                className="object-cover transform transition duration-300 hover:scale-110"
              />
              <h4 className="text-xl font-bold mt-10 m-2">{product.name}</h4>
              <p className="m-4">R{product.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className="mx-1 px-3 py-1 bg-gray-300 rounded"
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
