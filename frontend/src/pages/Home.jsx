/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import pic1 from '../images/hand with gold ring.jpg'
// import aboutPic from '../images/aboutPic.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Products } from './Products';
import earrings from '../images/earrings-category.jpg'
import bracelets from  '../images/bracelet-category.png'
import necklaces from '../images/necklace-category.jpg'
import watches from '../images/women-watch.jpg'
import aboutPic from '../images/aboutPic-1.jpg'
import aboutPic2 from '../images/about2.webp'
import aboutPic3 from '../images/image.png'

const categories = [
  {name: 'earring', image: earrings, description: 'From subtle studs to statement pieces, perfect for any occasion'},
  {name: 'bracelet', image: bracelets, description: 'Elegant designs to adorn your wrist with timeless charm'},
  {name: 'necklace', image: necklaces, description: 'Beautifully crafted pendants and chains to complement your style'},
  {name: 'watch', image: watches, description: 'Stylish timepieces that blend functionality with sophistication'},
]

const Home = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (category) => {
    navigate('/products', { state: { category } });
  };

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

      {/* Mid shop section */}
      <div className='bg-[#5c5c5c] text-center pt-10 pb-16'>
  <h1 className='text-6xl text-white font-carattere'>Shop by Category</h1>
  <hr className='mx-auto my-4 w-16 border-t-2 border-[#FFD700] pb-10'></hr>
  <div className='container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
    {categories.map((category, index) => (
      <div key={index} onClick={() => handleCategoryClick(category.name)} className='flex flex-col items-center bg-white text-black rounded-lg shadow-md overflow-hidden cursor-pointer'>
        <img src={category.image} alt={category.name} className='w-full h-48 sm:h-64 md:h-80 object-cover transform transition duration-300 hover:scale-110'/>
        <div className='p-4'>
          <h2 className='text-xl font-semibold'>{category.name}</h2>
          <p className='mt-2'>{category.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Mid about Section */}
      <div className="relative bg-[#DBDBDB] text-center py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:space-x-16">
        {/* Col 1 */}
        <div className="relative w-3/5 md:w-2/5">
          {/* Main Picture */}
          <img
            src={aboutPic}
            className="w-full object-cover rounded-md border-white shadow-md"
            alt="Main Picture"
          />
          {/* Secondary Picture */}
          <img
            src={aboutPic3}
            alt="Overlay"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-66 md:w-80 h-auto object-cover rounded-md border-2 border-white shadow-md"
          />
        </div>

        {/* Col 2 */}
        <div className="w-full md:w-2/5 mt-10 md:mt-20">
          <h1 className="text-4xl md:text-6xl text-black font-carattere pb-5">
            Discover the timeless beauty of fine jewellery at Luxe Elegance.
          </h1>
          <p className="text-lg text-black mb-14">
            Our exquisite designs are crafted to celebrate life’s most precious
            moments, blending sophistication with modern artistry. Let every piece
            tell your unique story of elegance and charm.
          </p>
          <Link to="/about" className="border-2 border-black py-3 px-4 hover:bg-slate-100 hover:text-black">
              Learn More
          </Link>
        </div>
      </div>
    </div>





      
    </>
  )
};

export default Home;  