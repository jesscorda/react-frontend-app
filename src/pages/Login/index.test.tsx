import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Login from '.';
import { fireEvent, render, screen, waitFor } from '@/test-utils/testUtils';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login', () => {
  test('should render login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('should navigate to tasks page after successful login', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'validuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validpassword' } });
    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/tasks'));
  });
});
