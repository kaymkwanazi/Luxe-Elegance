import { useState, useEffect } from 'react';
import { MdAccountCircle, MdDelete, MdUpload } from 'react-icons/md';
import ToggleMode from './ToggleMode'; // Assuming ToggleMode is a component in the same directory

const GeneralDetails = (theme, setTheme) => {
  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                headers: { 
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }

    });
    if (!response.ok) {
        throw new Error('Failed to fetch admin details')
    }
    const data = await response.json()
        setAdminInfo(data);
    } catch (error) {
        console.error(error)

    }
};
fetchAdminDetails();
}, []);

  return (
    <div className="container mx-auto px-4 flex flex-col">
      <div>
        <div className='flex justify-center items-center'>
          <button className='border border-black px-10 py-2 ml-28'>Edit profile</button>
        </div>     
        <div className='flex items-center mt-5'>
          <MdAccountCircle size={96} className="text-gray-500" />
          <div className='flex-1 flex justify-center items-center space-x-2'>
            <button className='flex items-center'>
              <MdDelete size={24} className="text-gray-500" />
            </button>
            <button className='border border-black px-7 py-2'>
              <MdUpload size={24} className='inline'/>
              <span className='ml-2'>Upload</span>
            </button>               
          </div>
        </div>
      </div>
      <div>
        <div className='flex justify-between mt-5 my-10'>
          <div>
            <h2 className='text-xl pb-10'>Personal Information</h2>
            <div className='flex flex-col'>
              <div className='flex pb-5'>
                <span>Name:</span>
                <span className='pl-10'>{adminInfo.name}</span>                           
              </div>                       
              <div className='flex pb-5'>
                <span>Email:</span>
                <span className='pl-10'>{adminInfo.email}</span>                           
              </div>
              
            </div>                 
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetails;