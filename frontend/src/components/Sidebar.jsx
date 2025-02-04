/* eslint-disable no-unused-vars */
import React from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
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
  )
}
