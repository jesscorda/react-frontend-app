import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ADMIN, User } from '../Users/types/User';
import Users from '.';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAuth } from '@/context/authContext';

jest.mock('@/context/authContext');
jest.mock('@/hooks/useLocalStorage');

describe('UserList', () => {
  const mockSetUsers = jest.fn();
  const mockUsers: User[] = [
    { id: '1', username: 'user1', role: 'ADMIN' },
    { id: '2', username: 'user2', role: 'OWNER' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: ADMIN,
    });
    (useLocalStorage as jest.Mock).mockReturnValue([mockUsers, mockSetUsers]);

    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  const renderUsersList = () => {
    document.body.innerHTML = '<div id="modal" />';
    return render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );
  };

  test('should render the Users component with tasks', () => {
    renderUsersList();

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  test('should filter tasks based on search term', () => {
    renderUsersList();

    fireEvent.change(screen.getByPlaceholderText('Search Items'), { target: { value: 'user1' } });

    expect(screen.queryByText('user2')).not.toBeInTheDocument();
  });
});
