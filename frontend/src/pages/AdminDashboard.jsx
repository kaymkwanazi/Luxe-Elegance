/* eslint-disable no-unused-vars */
import React, { useEffect, useState, use } from 'react'
import { IoMdNotifications } from "react-icons/io";
import { MdAccountCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UsersAndProducts } from '../components/UsersAndProducts';
import { Sidebar } from '../components/Sidebar';
import { AdminNavbar } from '../components/AdminNavbar';
import  BarGraph  from '../components/Statistics/BarGraph';
import  PieChart  from '../components/Statistics/PieChart';

export const AdminDashboard = (theme) => {
  return (
    <>
    <div className='flex h-screen'>
        {/* Side bar */}
        <Sidebar />
        {/* Main content */}
        <main className={`flex-1 border-t-2 ${theme === 'dark' ? 'bg-[#494949]' : 'bg-[#EEDAEA]'}`}>
            {/* header */}
            <AdminNavbar />

            {/* Total items and users */}
            <div className='container mx-auto px-10'>
                <h1 className='text-4xl mb-10'>Dashboard</h1>
                <UsersAndProducts />
            </div>

            {/* Statistics */}
            <div className='container mx-auto px-10 mt-5'>
              <div className='grid grid-cols-2 gap-10'>
                {/* Bar graph */}
                <div className='flex flex-col h-full'>
                  <h1 className='text-center text-2xl'>Monthly Sales</h1>
                  <div className='flex-1 h-96'>
                    <BarGraph />
                  </div>
                </div>  
                {/* Pie chart */}
                <div className='flex flex-col h-full'>
                  <h1 className='text-center text-2xl'>Sales per Category</h1>
                  <div className='flex-1 h-96'>
                    <PieChart />
                  </div>
                </div>
              </div>
            </div>
        </main>
    </div>
    </> 
  )
}
