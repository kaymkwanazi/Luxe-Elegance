/* eslint-disable no-unused-vars */
import React from 'react'
import ToggleMode from '../components/ToggleMode'
import { Link } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'

export const Settings = () => {
  return (
    
    <div className="min-h-screen flex bg-white dark:bg-gray-900 text-black dark:text-white">  
      <Sidebar />
      <main className='flex-1 bg-[#EEDAEA]'>
        <div className='container mx-auto px-4 py-10'>
          <AdminNavbar />
          <h1 className="text-4xl font-bold mb-5">Settings</h1>
          {/* <p className='inline'>Switch to dark mode<ToggleMode /></p> */}
          <Link to='/dashboard' className='text-blue-500'>Go to dashboard</Link>
        </div> 
      </main> 
    </div>
  
  )
}
