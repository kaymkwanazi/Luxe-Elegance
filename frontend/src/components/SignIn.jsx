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
        <form onSubmit={handleSignIn}>
          <h2 className='text-2xl'>Sign In</h2>
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
          <button type="submit">Sign In</button>
          <p>
            Not registered?{' '}
            <span onClick={() => setIsRegistered(false)}>Register here</span>
          </p>
        </form>
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