import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Settings } from './pages/Settings';
import Logout from './components/Logout';
import Footer from './components/Footer';
import { Products } from './pages/Products';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

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

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const handleItemClick = () => {
    setIsPopUpVisible(false);
  };

  return (
    <Router>
      <Navbar 
        onSignInClick={handleSignInClick} 
        isAuthenticated={isAuthenticated} 
        user={user} 
        isPopUpVisible={isPopUpVisible}
        togglePopUp={togglePopUp}
        handleItemClick={handleItemClick}
      />
      <SignIn modalIsOpen={modalIsOpen} onCloseModal={handleCloseModal} onSignIn={handleSignIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/logout' element={<Logout onSignOut={handleSignOut} />} />
        <Route path='/products' element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;