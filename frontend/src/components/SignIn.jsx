/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-modal';
import signinPic from '../images/Jewellery shop.png';
import registerPic from '../images/Sign up-pana.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { registerSuccess } from '../slices/authSlice';

 Modal.setAppElement('#root'); 

const SignIn = ({ modalIsOpen, onCloseModal, onSignIn }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignIn = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/users/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // Ensure cookies are included
        });
        const data = await response.json();
        console.log('response data', data);
        if (response.ok) {
          localStorage.setItem('token', data.token);
          onSignIn(data); // Pass user data to the parent component
          
          if (data.isAdmin) {
            console.log('Admin, navigating to dashboard');
            navigate('/dashboard'); // Redirect to admin dashboard
          } else {
            console.log('User is not admin, navigating to home');
            navigate('/'); // Redirect to home page
          } 
        } else {
          alert(data.message || 'Invalid email or password');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Sign-in failed');
      }
    };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isAdmin }),
        credentials: 'include', // Ensure cookies are included
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(registerSuccess({ token: data.token, user: data.user }));
        setIsRegistered(true);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  return (
    <Modal 
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      contentLabel="Sign In / Register"
     
    >
      {isRegistered ? (
      <div className='grid grid-cols-2 gap-4'>
      <div className='flex items-center justify-center'>
        <img src={signinPic} alt="Sign In" className='w-full h-auto' />
      </div>
      <div className='flex items-center justify-center'>
        <form onSubmit={handleSignIn} className='w-full max-w-md'>
          <h2 className='block text-gray-700 text-2xl mb-5'>Sign In</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign In</button>
          <p className="mt-4">
            Not registered?{' '}
            <span onClick={() => setIsRegistered(false)} className='text-blue-500 hover:text-blue-700 cursor-pointer underline'>Register here</span>
          </p>
        </form>
      </div>
    </div>
  )  : (
    <div className='grid grid-cols-2 gap-4'>
      <div className='flex items-center justify-center'>
        <img src={registerPic} alt="Register" className='w-full h-3/4' />
      </div>
      <div className='flex items-center justify-center'>
        <form onSubmit={handleRegister} className='w-full max-w-md'>
          <h2 className='block text-gray-700 text-center text-2xl mb-5'>Register</h2>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2 mt-4'>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <label>
              <input type="checkbox" className='mt-4 mr-2' 
              checked = {isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Admin
            </label>
          </div>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outlinee'>Register</button>
          <p className='mt-2'>
            Already registered?{' '}
            <span onClick={() => setIsRegistered(true)} className='text-blue-500 hover:text-blue-700 cursor-pointer underline'>Sign in here</span>
          </p>
        </form>
      </div>
      
    </div>
        
      )}
    </Modal>
  );
};

export default SignIn;