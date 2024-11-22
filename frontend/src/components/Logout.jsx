import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onSignOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onSignOut();
    navigate('/');
  }, [onSignOut, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;