import React, { useState, useEffect} from 'react'

export const UsersAndProducts = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem('token'); // Adjust this line based on where you store the token
            const response = await fetch('http://localhost:5000/api/users', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchUsers();
      }, []);

    useEffect(() => {      
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchProducts();
    }, []);

  return (
    <>
    <div className='flex items-center justify-center gap-x-10 text-center font-semibold text-2xl'>
        <div className='bg-white w-1/2 rounded-md shadow-md p-5 m-5'>
            <h1 className='mb-5'>Total Users</h1>
            <p>{users.length}</p>
        </div>
        <div className='bg-white w-1/2 rounded-md shadow-md p-5 m-5'>
            <h1 className='mb-5'>Total Products</h1>
            <p>{products.length}</p>
        </div>
    </div>
    </>
  )
}
