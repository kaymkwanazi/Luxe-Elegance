import React from 'react'
import { GiDogHouse } from 'react-icons/gi'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='flex z-50 fixed w-full justify-between py-3 px-3 bg-slate-300'>
        <Link to='/'>
            <h1 className='text-2xl'> PET SHOP</h1>
        </Link>
        <ul className='flex items-center justify-center'>
            <li className='font-semibold space-x-5'>
                <a href="/" className='hover:text-green-500'>Home</a>
                <a href="/about" className='hover:text-green-500'>About Us</a>
                <a href="/about" className='hover:text-green-500'>Products</a>
                <a href="/products" className='hover:text-green-500'>Contact Us</a>
            </li>
        </ul>
        <Link to='/signin'>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded'>Sign In</button>
        </Link>
    </nav>
  )
}
