import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './core/routes/routes';

import './styles/tailwind.css';
import './styles/normalize.css';
import { AuthProvider } from './context/authContext';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider initialUserValue={null}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
