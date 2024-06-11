import React from 'react';
import DeleteConfirmation from '.';
import { fireEvent, render, screen } from '@/test-utils/testUtils';

describe('Delete Confirmation', () => {
  const handleDelete = jest.fn();

  const handleCancel = jest.fn();

  const renderComponent = () => {
    return render(<DeleteConfirmation onDelete={handleDelete} onCancel={handleCancel} />);
  };

  test('should show the delete confirmation', () => {
    renderComponent();
    expect(screen.getByText('Delete Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('should call handleDelete on delete button press', () => {
    renderComponent();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  test('should call handleCancel on delete button press', () => {
    renderComponent();
    const deleteButton = screen.getByText('Cancel');
    fireEvent.click(deleteButton);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
