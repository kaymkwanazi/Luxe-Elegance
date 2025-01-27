import React from 'react'
import pic1 from '../images/hand with gold ring.jpg'
// import aboutPic from '../images/aboutPic.jpg'
import { Link } from 'react-router-dom'
import { Products } from './Products';
import earrings from '../images/earrings-category.jpg'
import bracelets from  '../images/bracelet-category.png'
import necklaces from '../images/necklace-category.jpg'
import watches from '../images/women-watch.jpg'

const categories = [
  {name: 'Earrings', image: earrings, description: 'From subtle studs to statement pieces, perfect for any occasion'},
  {name: 'Bracelets', image: bracelets, description: 'Elegant designs to adorn your wrist with timeless charm'},
  {name: 'Necklaces', image: necklaces, description: 'Beautifully crafted pendants and chains to complement your style'},
  {name: 'Watches', image: watches, description: 'Stylish timepieces that blend functionality with sophistication'},
]

const Home = () => {
  return (
    <>
    {/* Hero section */}
      <div className='min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center' 
        style={{backgroundImage: `url(${pic1})`}}>
            <div className='absolute bg-black bg-opacity-40 inset-0'></div>
            <div className='relative text-white text-center'>
                <h1 className='text-7xl'>Luxe Elegance, Redefined</h1>
                <p className=' text-center text-xl mt-5'>Timeless Elegance, Crafted to Shine</p>
                <Link to='/products'>
                    <button className='border-2 py-3 px-4 mt-16 hover:bg-slate-100 hover:text-black'>Shop now</button>
                </Link>
            </div>
      </div>

      {/* Mid section */}
      <div className='bg-[#494949]  text-center py-10'>
        <h1 className='text-4xl text-white'>Shop by Category</h1>
        <hr className='mx-auto my-4 w-10 border-t-2 border-[#FFD700] pb-10'></hr>
        <div className='container mx-auto px-4 grid cols-1 md:grid-cols-4 gap-5'>
        {categories.map((category, index) => (
            <div key={index} className='flex flex-col items-center bg-white text-black rounded-lg shadow-md overflow-hidden cursor-pointer'>
              <img src={category.image} alt={category.name} className='w-60 h-48 object-cover'/>
              <div className='p-4'>
                <h2 className='text-xl font-semibold'>{category.name}</h2>
                <p className='mt-2'>{category.description}</p>
              </div>
               
            </div>
          ))}
         </div>

      </div>
      
    </>
  )
};

export default Home;  