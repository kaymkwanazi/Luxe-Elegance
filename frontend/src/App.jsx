import React, { useState } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SignIn } from './components/SignIn';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignInClick = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSignIn = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setModalIsOpen(false);
  };

  return (
    <BrowserRouter>
    <Navbar onSignInClick={handleSignInClick} isAuthenticated={isAuthenticated} user={user} />
    <SignIn modalIsOpen={modalIsOpen} onCloseModal={handleCloseModal} onSignIn={handleSignIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<Home />} />
        <Route path='/' element={<Home />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;