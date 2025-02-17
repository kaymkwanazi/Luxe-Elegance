import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ViewProduct = ({ isAuthenticated, addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                console.log("Fetched item",data);
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setProduct(data.product || data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

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
        <div className='bg-[#494949] min-h-screen text-white flex'>
            <div className='container mx-auto px-5 flex items-center justify-center'>
                <div className='grid cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <img src={product.image} alt={product.name} className='object-cover w-full h-96 rounded-2xl'/>
                    </div>
                    <div className='p-5'>
                        <h1 className='text-3xl pb-2'>{product.name}</h1>
                        <p className='text-2xl font-bold'>R{product.price}</p>
                        <hr className='my-5 border-[#FFD700]'/>
                        <p className='font-semibold'>DESCRIPTION</p>
                        <p className='text-sm'>{product.description}</p>  
                        <hr className='my-5 border-[#FFD700]'/>  
                        {isAuthenticated && (
                  <div className="flex justify-center m-4">
                    <button
                      className="bg-[#bca522] px-10 py-1 rounded text-white"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ViewProduct;