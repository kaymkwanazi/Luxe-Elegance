/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import UpdateUser from '../components/UpdateUser';

Modal.setAppElement('#root');

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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

  const handleDelete = (user) => {
    console.log("🚀 ~ handleDelete ~ user:", user)
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/users/${user._id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw new Error(error.message || 'Network response was not ok');
            });
          }
          return response.json();
        })
        .then(data => {
          if (data.message === 'User removed') {
            setAllUsers(allUsers.filter(u => u._id !== user._id));
            Swal.fire(
              'Deleted!',
              `${user.name} has been deleted.`,
              'success'
            );
          } else {
            Swal.fire(
              'Error!',
              `There was a problem deleting the user: ${data.message}`,
              'error'
            );
          }
        })
        .catch(error => {
          Swal.fire(
            'Error!',
            `There was a problem deleting the user: ${error.message}`,
            'error'
          );
        });
      }
    });
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setAllUsers(allUsers.map(u => u._id === updatedUser._id ? updatedUser : u));
    setIsUpdateModalOpen(false);
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
              className='ml-2 px-4 py-2 border border-black hover:bg-slate-300'
            >
              Clear
            </button>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
              <thead className='bg-slate-200'>
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
                  <tr key={user._id} className='hover:bg-gray-50'>
                    <td className='py-2 px-4 border border-gray-300'>{user.name}</td>
                    <td className='py-2 px-4 border border-gray-300'>{user.email}</td>
                    <td className='py-2 px-4 border border-gray-300'>
                      <div className='flex justify-center items-center space-x-5'>
                        <button onClick={() => handleUpdate(user)} className='text-blue-500 mx-2'>
                          <i className='fas fa-edit'></i>
                        </button>
                        <button onClick={() => handleDelete(user)} className='text-red-500 mx-2'>
                          <i className='fas fa-trash'></i>
                        </button>
                      </div>
                    </td>
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

      {/* Update User Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        contentLabel="Update User"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedUser && (
          <UpdateUser
            user={selectedUser}
            onUpdateUser={handleUpdateUser}
            onClose={() => setIsUpdateModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default AllUsers;