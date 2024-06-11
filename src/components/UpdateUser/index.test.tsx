import React from 'react';
import UpdateUser from '.';
import { fireEvent, render, screen } from '@/test-utils/testUtils';
import { User } from '@/pages/Users/types/User';

describe('UpdateUser', () => {
  const user: User = {
    id: '1',
    username: 'testuser',
    role: 'ADMIN',
  };

  test('should render update user form with initial values', () => {
    render(<UpdateUser user={user} onSubmitData={jest.fn()} />);
    expect(screen.getByLabelText('Username')).toHaveValue('testuser');
    expect(screen.getByLabelText('Role')).toHaveValue('ADMIN');
  });

  test('should call onSubmitData when form is submitted with updated user data', () => {
    const mockSubmitData = jest.fn();
    render(<UpdateUser user={user} onSubmitData={mockSubmitData} />);
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'OWNER' } });
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockSubmitData).toHaveBeenCalledWith({
      id: '1',
      username: 'newuser',
      role: 'OWNER',
    });
  });

  test('should call onCancel when cancel button is clicked', () => {
    const mockCancel = jest.fn();
    render(<UpdateUser user={null} onSubmitData={jest.fn()} onCancel={mockCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCancel).toHaveBeenCalled();
  });
});
