import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SignIn } from './components/SignIn';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleSignInClick = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar onSignInClick={handleSignInClick} />
        <SignIn modalIsOpen={modalIsOpen} onCloseModal={handleCloseModal} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App;
