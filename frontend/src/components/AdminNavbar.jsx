/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const AdminNavbar = () => {
    const [admin, setAdmin] = React.useState(null)
    
    useEffect(() => {
        const fetchAdminDetails = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    method: 'GET',
                    headers: { 
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }

        });
        if (!response.ok) {
            throw new Error('Failed to fetch admin details')
        }
        const data = await response.json()
            setAdmin(data);
        } catch (error) {
            console.error(error)

        }
    };
    fetchAdminDetails();
}, []);
  return (
    <header>
        <div className='container mx-auto px-5 py-5 flex justify-between items-center mb-6'>
                <h1 className=' text-2xl font-semibold'>Welcome {admin ? admin.name: 'User'}!</h1>
                <div className="flex items-center justify-between space-x-4">
                    <button>
                        <IoMdNotifications size={24} className='text-gray-500'/>
                    </button>
                    <input type='text' placeholder='Search' className='border-2 border-gray-300 rounded-xl px-4 text-sm py-1'/>
                    <button>
                        <Link to='/profile'>
                            <MdAccountCircle size={28} className='text-gray-500'/>
                        </Link>
                    </button>

                </div>
            </div>
    </header>
  )
}
