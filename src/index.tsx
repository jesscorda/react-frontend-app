import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './core/routes/routes';

import './styles/tailwind.css';
import './styles/normalize.css';
import { AuthProvider } from './context/authContext';
import ErrorBoundary from './components/ErrorBoundary';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider initialUserValue={null}>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
