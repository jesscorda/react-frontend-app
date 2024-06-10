import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/authContext';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <header className="flex justify-between p-3 bg-blue-950 text-white items-center">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      {isLoggedIn && (
        <nav>
          <ul className="flex gap-3 text-lg">
            <li>
              <Link to="tasks">Tasks</Link>
            </li>
            <li>
              <Link to="users">Users</Link>
            </li>
            <li>
              <Link onClick={() => setIsLoggedIn(false)} to="login">
                {isLoggedIn ? 'Logout' : 'Login'}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
