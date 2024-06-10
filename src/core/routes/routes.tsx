import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import RootView from '@/pages/RootView';
import TaskList from '@/pages/TaskList';
import Users from '@/pages/Users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/tasks',
        element: <TaskList />,
        index: true,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
]);
