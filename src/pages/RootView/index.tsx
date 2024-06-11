import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/context/authContext';

const RootView = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/tasks');
    else navigate('/login');
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootView;
