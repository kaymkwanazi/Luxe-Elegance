/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Settings } from './pages/Settings';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Products from './pages/Products';
import AddProduct from './components/addProduct';
import Modal from './components/Modal';
import Cart from './components/Cart';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';


const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  console.log("🚀 ~ App ~ cart:", cart)

  const location = useLocation();
  const shouldShowNavbarAndFooter = location.pathname !== '/dashboard';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProducts();
  }, []);

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

  const handleAddProductClick = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const newAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      {shouldShowNavbarAndFooter && (<Navbar 
        onSignInClick={handleSignInClick} 
        onAddProductClick={handleAddProductClick}
        />
      )}
    <SignIn modalIsOpen={modalIsOpen} onCloseModal={handleCloseModal} onSignIn={handleSignIn} />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/logout' element={<Logout onSignOut={handleSignOut} />} />
        <Route path='/products' element={<Products products={products} isAdmin={user?.isAdmin} isAuthenticated={isAuthenticated} addToCart={addToCart}/>} />
        <Route path='/addProduct' element={<AddProduct newAddProduct={newAddProduct} />} />
        <Route path='/cart' element={<Cart cart={cart} />} />
    </Routes>
    {shouldShowNavbarAndFooter && <Footer />}
    <Modal isOpen={isAddProductModalOpen} onClose={handleCloseAddProductModal}>
        <AddProduct newAddProduct={newAddProduct} onClose={handleCloseAddProductModal} />
    </Modal>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;