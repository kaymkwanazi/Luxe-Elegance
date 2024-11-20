import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

export const SignIn = ({ modalIsOpen, onCloseModal, onSignIn }) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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
      // Handle sign-in error (e.g., show an error message)
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
      setIsRegistered(true);
    } else {
      
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      contentLabel="Sign In / Register"
    >
      {isRegistered ? (
      <div className='grid cols-2'>
      <div>
        <form onSubmit={handleSignIn}>
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
        
      ) : (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already registered?{' '}
            <span onClick={() => setIsRegistered(true)}>Sign in here</span>
          </p>
        </form>
      )}
    </Modal>
  );
};