import React, { useState } from 'react';
import Modal from 'react-modal';
import signinPic from '../images/Jewellery shop.png'
import registerPic from '../images/Sign up-pana.png'
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../slices/authSlice';

Modal.setAppElement('#root'); // Set the root element for accessibility

export const SignIn = ({ modalIsOpen, onCloseModal}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      onSignIn(data.user); // Pass user data to the parent component
    } else {
      alert('Invalid email or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(registerSuccess({ token: data.token, user: data.user }));
      setIsRegistered(true);
    } else {
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