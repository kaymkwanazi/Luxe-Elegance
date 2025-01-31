import React from 'react'
import logo from '../images/logo-luxe.webp'
import { IoMdNotifications } from "react-icons/io";
import { MdAccountCircle } from 'react-icons/md';

export const AdminDashboard = () => {
  return (
    <>
    <div className='flex h-screen'>
        {/* Side bar */}
        <aside className='w-1/5 bg-[#494949] text-white flex flex-col justify-center items-center border-r-2 border-r-yellow-500'>
            <div className='flex items-center justify-center mb-6'>
                <img src={logo} alt='logo' className='w-20 h-20 rounded-full'/>
            </div>
            <nav className='text-white'>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Dashboard</a>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Products</a>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Users</a>
                <a href='/dashboard' className='block py-2 px-4 hover:bg-[#333333] hover:border hover:border-white'>Settings</a>
            </nav>

            <button className='px-2 py-2 bg-white text-black text-sm rounded-lg mt-4'>
                Logout
            </button>
            
        </aside>

        {/* Main content */}
        <main className='flex-1 bg-pink-200 border-t-2 '>
            <div className='container mx-auto px-5 py-5 flex justify-between items-center mb-6'>
                <h1 className=' text-xl font-semibold'>Welcome User</h1>
                <div className="flex items-center justify-between space-x-4">
                    <button>
                        <IoMdNotifications size={24}/>
                    </button>
                    <input type='text' placeholder='Search' className='border-2 border-gray-300 rounded-xl px-4 text-sm py-1'/>
                    <button>
                        <MdAccountCircle size={28} />
                    </button>

                </div>

            </div>

        </main>
    </div>
    </> 
  )
}
