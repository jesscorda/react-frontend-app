import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import RootView from '@/pages/RootView';
import TaskList from '@/pages/TaskList';
import Users from '@/pages/Users';
import ErrorComponent from '@/components/ErrorComponent';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'tasks',
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
