import React from 'react'
import ToggleMode from '../components/ToggleMode'
import { Link } from 'react-router-dom'

export const Settings = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">  
      <div className='container mx-auto px-4 py-10'>
        <h1 className="text-4xl font-bold mb-5">Settings</h1>
        {/* <p className='inline'>Switch to dark mode<ToggleMode /></p> */}
        <Link to='/dashboard' className='text-blue-500'>Go to dashboard</Link>
      </div>  
    </div>
    </>
  )
}
