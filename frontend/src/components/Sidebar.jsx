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
                navigate('/');
            }
        });
    };
  return (
        <aside className='w-1/5 py-5 bg-[#494949] text-white flex flex-col items-center border-r-2 border-r-yellow-500'>
            <div className='flex items-center justify-center'>
                <img src={logo} alt='logo' className='rounded-full' width={52}/>
            </div>
            <nav className='text-white flex-grow flex flex-col items-center py-28 space-y-5'>
                <NavLink to='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white' activeClassName='bg-[#333333] border border-white'>Dashboard</NavLink>
                <NavLink to='/allProducts' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white' activeClassName='bg-[#333333] border border-white'>Products</NavLink>
                <NavLink to='/allUsers' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white' activeClassName='bg-[#333333] border border-white'>Users</NavLink>
                <NavLink to='/Settings' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white' activeClassName='bg-[#333333] border border-white'>Settings</NavLink>
            </nav>
            <div className='mt-auto py-10'>
                <button className='px-5 py-2 bg-white text-black text-sm rounded-lg mt-4'
                onClick={handleLogout}>Logout</button>
            </div>      
        </aside>
  )
}
