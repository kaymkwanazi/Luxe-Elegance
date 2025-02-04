/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import axios from 'axios';

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        setAllUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
       
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='flex-1 bg-[#EEDAEA]'>
        {/* Header */}
        <AdminNavbar />
        {/* Users list */}
        <div className='container mx-auto px-5 py-10'>
          <h1 className='text-2xl mb-5 font-semibold'>All Users</h1>
          
          <ul className='flex flex-col space-y-4'>
            {allUsers.map(user => (
              <li key={user.id} className='flex items-center'>
                <div>
                  <h2 className='text-xl'>{user.name}</h2>
                 
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AllUsers;