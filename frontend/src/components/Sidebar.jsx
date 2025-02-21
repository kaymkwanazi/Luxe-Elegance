/* eslint-disable no-unused-vars */
import React from 'react'
import swal from 'sweetalert'
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../images/logo-luxe.webp'

export const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {    
        swal({
            title: 'Cornfirm Logout',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Cancel',
                    value: null,
                    visible: true,
                    className: 'mr-10',
                    closeModal: true
                },
                confirm: {
                    text: 'Logout',
                    value: true,
                    visible: true,
                    className: 'mr-28',
                    closeModal: true
                  }
            },
            dangerMode: true,
        }).then((willLogout) => {
            if (willLogout) {
                localStorage.removeItem('token');
                navigate('/Logout');
            }
        });
    };
  return (
        <aside className='w-1/5 py-5 bg-[#494949] text-white flex flex-col items-center border-r-2 border-r-yellow-500'>
            <div className='flex items-center justify-center'>
                <img src={logo} alt='logo' className='rounded-full' width={52}/>
            </div>
            <nav className='text-white flex-grow flex flex-col items-center py-28 space-y-5'>
            <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? 'nav-link px-4 py-2 my-2 bg-gray-700 border border-gray-600 rounded'
                            : 'nav-link px-4 py-2 my-2 hover:bg-gray-700 hover:border-gray-600 border border-transparent rounded'
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/allProducts"
                    className={({ isActive }) =>
                        isActive
                            ? 'nav-link px-4 py-2 my-2 bg-gray-700 border border-gray-600 rounded'
                            : 'nav-link px-4 py-2 my-2 hover:bg-gray-700 hover:border-gray-600 border border-transparent rounded'
                    }
                >
                    Products
                </NavLink>
                <NavLink
                    to="/allUsers"
                    className={({ isActive }) =>
                        isActive
                            ? 'nav-link px-4 py-2 my-2 bg-gray-700 border border-gray-600 rounded'
                            : 'nav-link px-4 py-2 my-2 hover:bg-gray-700 hover:border-gray-600 border border-transparent rounded'
                    }
                >
                    Users
                </NavLink>
                <NavLink
                    to="/Settings"
                    className={({ isActive }) =>
                        isActive
                            ? 'nav-link px-4 py-2 my-2 bg-gray-700 border border-gray-600 rounded'
                            : 'nav-link px-4 py-2 my-2 hover:bg-gray-700 hover:border-gray-600 border border-transparent rounded'
                    }
                >
                    Settings
                </NavLink>
            </nav>
            <div className='mt-auto py-10'>
                <button className='px-5 py-2 border hover:bg-[#333333] text-sm mt-4'
                onClick={handleLogout}>Logout</button>
            </div>      
        </aside>
  )
}
