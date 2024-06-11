import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import Header from '.';
import { useAuth } from '@/context/authContext';
import { ADMIN, User } from '@/pages/Users/types/User';

jest.mock('@/context/authContext');
const mockSetUser = jest.fn();

describe('Header', () => {
  const renderHeaderComponent = (user: User | null) => {
    (useAuth as jest.Mock).mockReturnValue({
      user: user,
      setUser: mockSetUser,
    });
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  };

  test('renders the header with user links when user is logged in', () => {
    renderHeaderComponent(ADMIN);
    expect(screen.getByRole('heading', { name: /Task Manager/i })).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.queryByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders the header without user links when no user is logged in', () => {
    renderHeaderComponent(null);
    expect(screen.getByRole('heading', { name: /Task Manager/i })).toBeInTheDocument();
    expect(screen.queryByText('Tasks')).not.toBeInTheDocument();
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('calls setUser with null when Logout is clicked', () => {
    renderHeaderComponent(ADMIN);
    fireEvent.click(screen.getByTestId('auth-link'));
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});
