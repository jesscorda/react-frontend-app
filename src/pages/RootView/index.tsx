import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/context/authContext';

const RootView = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootView;
