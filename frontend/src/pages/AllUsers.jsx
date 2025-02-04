/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import axios from 'axios';

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const usersPerPage = 10;

  // Fetch all users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setAllUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users based on sort configuration
  const sortedUsers = [...filteredUsers].sort((a, b) => {
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

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='flex-1 bg-[#EEDAEA]'>
        {/* Header */}
        <AdminNavbar />
        {/* Users list */}
        <div className='container mx-auto px-10 py-10'>
          <h1 className='text-4xl mb-10'>All Users</h1>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search by name or email'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-md'
            />
            <button
              onClick={() => setSearchTerm('')}
              className='ml-2 px-4 py-2 bg-red-500 text-white rounded-md'
            >
              Clear
            </button>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
              <thead className='bg-gray-100'>
                <tr>
                  <th
                    className='py-2 px-4 border border-gray-300 cursor-pointer'
                    onClick={() => handleSort('name')}
                  >
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th
                    className='py-2 px-4 border border-gray-300 cursor-pointer'
                    onClick={() => handleSort('email')}
                  >
                    Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='py-2 px-4 border border-gray-300'>{user.name}</td>
                    <td className='py-2 px-4 border border-gray-300'>{user.email}</td>
                    <td className='py-2 px-4 border border-gray-300'>delete or view</td> {/* Add clickable icons for delete or view */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className='flex justify-center mt-4'>
            <nav>
              <ul className='inline-flex items-center -space-x-px'>
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`py-2 px-3 leading-tight border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUsers;