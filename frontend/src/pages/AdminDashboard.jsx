import React, { useEffect, useState, use } from 'react'
import logo from '../images/logo-luxe.webp'
import { IoMdNotifications } from "react-icons/io";
import { MdAccountCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UsersAndProducts } from '../components/UsersAndProducts';

export const AdminDashboard = () => {
    const [admin, setAdmin] = React.useState(null)
    const navigate = useNavigate();

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

const handleLogout = () => {    
    swal({
        title: 'Cornfirm Logout',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        buttons: ['Cancel', 'Logout'],
        dangerMode: true,
    }).then((willLogout) => {
        if (willLogout) {
            localStorage.removeItem('token');
            navigate('/');
        }
    });
};

  return (
    <>
    <div className='flex h-screen'>
        {/* Side bar */}
        <aside className='w-1/5 py-5 bg-[#494949] text-white flex flex-col items-center border-r-2 border-r-yellow-500'>
            <div className='flex items-center justify-center'>
                <img src={logo} alt='logo' className='rounded-full' width={52}/>
            </div>
            <nav className='text-white flex-grow flex flex-col items-center py-28 space-y-5'>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Dashboard</a>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Products</a>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Users</a>
                <a href='/Settings' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Settings</a>
            </nav>
            <div className='mt-auto py-10'>
                <button className='px-5 py-2 bg-white text-black text-sm rounded-lg mt-4'
                onClick={handleLogout}>Logout</button>
            </div>      
        </aside>

        {/* Main content */}
        <main className='flex-1 bg-[#EEDAEA] border-t-2 '>
            {/* header */}
            <div className='container mx-auto px-5 py-5 flex justify-between items-center mb-6'>
                <h1 className=' text-xl font-semibold'>Welcome {admin ? admin.name: 'User'}!</h1>
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

            {/* Total items and users */}
            <div className='container mx-auto px-5 py-5'>
                <UsersAndProducts />
            </div>
        </main>
    </div>
    </> 
  )
}
