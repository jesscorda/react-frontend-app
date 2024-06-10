import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ADMIN, User } from '../Users/types/User';
import Header from '@/components/Header';
import { useAuth } from '@/context/authContext';
import useLocalStorage from '@/hooks/useLocalStorage';

const RootView = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [users, setUsers] = useLocalStorage<User[] | null>('users', []);

  useEffect(() => {
    if (!users) setUsers([ADMIN]);
    if (!user) navigate('/login');
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootView;
