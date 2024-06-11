import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/authContext';

const Header = () => {
  const { user, setUser } = useAuth();

  return (
    <header className="flex justify-between p-3 bg-blue-950 text-white items-center">
      <h1 className="text-xl md:text-2xl font-bold" data-testid="header-title">
        Task Manager
      </h1>
      {user && (
        <nav>
          <ul className="flex gap-3 text-sm md:text-lg">
            <li>
              <Link to="tasks">Tasks</Link>
            </li>
            {user.role === 'ADMIN' && (
              <li>
                <Link to="users">Users</Link>
              </li>
            )}
            <li>
              <Link onClick={() => setUser(null)} to="login" data-testid="auth-link">
                {user ? 'Logout' : 'Login'}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
