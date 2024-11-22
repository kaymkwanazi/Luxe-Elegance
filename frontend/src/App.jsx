import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Settings } from './pages/Settings';
import Logout from './components/Logout';
import Footer from './components/Footer';

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

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar onSignInClick={handleSignInClick} isAuthenticated={isAuthenticated} user={user} />
      <SignIn modalIsOpen={modalIsOpen} onCloseModal={handleCloseModal} onSignIn={handleSignIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/logout' element={<Logout onSignOut={handleSignOut} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;