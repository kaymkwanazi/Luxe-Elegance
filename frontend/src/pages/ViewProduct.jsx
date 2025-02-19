/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ViewProduct = ({ isAuthenticated, addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            console.log("Fetched product:", data);
            if (!res.ok) {
              throw new Error(data.message);
            }
            setProduct(data.product || data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        const fetchAllProducts = async () => {
          try {
            const res = await fetch('/api/products');
            const data = await res.json();
            console.log("Fetched all products:", data);
            if (!res.ok) {
              throw new Error(data.message);
            }
            setAllProducts(data.products || data);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchProduct();
        fetchAllProducts();
      }, [id]);
    

    useEffect(() => {
        if (product && allProducts.length > 0) {
          console.log("Product category:", product.category);
          console.log("All products:", allProducts);
          const filteredProducts = allProducts.filter((p) => {
            console.log("Checking product:", p);
            return p.category === product.category && p._id !== product.id
        }).slice(0, 3); // Limit to 3 items
          console.log("Filtered related products:", filteredProducts);
          setRelatedProducts(filteredProducts);
        }
      }, [product, allProducts]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }


    console.log('isAuthenticated', isAuthenticated);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    if (!product) {
        return <p>Product not found</p>
    }

    return (
        <>
        <div className='bg-[#494949] min-h-screen text-white flex '>
            <div className='container mx-auto px-5 flex flex-col my-20 pt-20'>
                <div className='grid cols-1 md:grid-cols-2'>
                    <div className='flex justify-center items-center'>
                        <img src={product.image} alt={product.name} className='object-cover w-full h-[500px] md:w-[600px] rounded-2xl '/>
                    </div>
                    <div className='p-5'>            
                        <h1 className='text-4xl pb-5'>{product.name}</h1>
                        <p className='text-2xl font-bold'>R{product.price}</p>
                        <hr className='my-5 mr-20 border-[#FFD700]'/>
                        <p className='text-2xl font-semibold pb-3'>DESCRIPTION</p>
                        <p className='text-lg'>{product.description}</p>  
                        <hr className='my-5 mr-20 border-[#FFD700]'/>  
                    {isAuthenticated && (
                        <div className="flex pt-5">
                            <button className="bg-[#bca522] px-10 py-1 rounded text-white"
                                onClick={() => addToCart(product)}
                            >
                            Add to cart
                            </button>
                        </div>
                        )} 
                    </div>
                </div>

                <div className='container mx-auto px-16 pt-16'>
                    <h1 className='text-2xl md:text-4xl'>You may also like</h1>
                    <p className='py-5 text-lg'>Make every day special with high quality jewellery</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-5'>
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct, index) => (
                        <div key={index} className='border border-white text-white p-5 rounded-lg h-full'>
                            <img src={relatedProduct.image} alt={relatedProduct.name} className='object-cover w-full h-96 rounded-lg'/>
                            <h2 className='text-xl mt-5'>{relatedProduct.name}</h2>
                            <p className='text-lg font-bold'>R{relatedProduct.price}</p>
                            <button
                            className="bg-[#bca522] px-5 py-1 my-5 rounded text-white"
                            onClick={() => addToCart(relatedProduct)}
                            >
                            Add to cart
                            </button>
                        </div>
                        ))
                    ) : (
                        <p>No related products found.</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ViewProduct;