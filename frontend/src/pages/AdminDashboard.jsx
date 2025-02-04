/* eslint-disable no-unused-vars */
import React, { useEffect, useState, use } from 'react'
import { IoMdNotifications } from "react-icons/io";
import { MdAccountCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UsersAndProducts } from '../components/UsersAndProducts';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';

export const AdminDashboard = () => {
  return (
    <>
    <div className='flex h-screen'>
        {/* Side bar */}
        <Sidebar />
        {/* Main content */}
        <main className='flex-1 bg-[#EEDAEA] border-t-2'>
            {/* header */}
            <AdminNavbar />

            {/* Total items and users */}
            <div className='container mx-auto px-5 py-5'>
                <h1 className='text-4xl mb-10'>Dashboard</h1>
                <UsersAndProducts />
            </div>
        </main>
    </div>
    </> 
  )
}
