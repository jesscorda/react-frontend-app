import React from 'react';
import TaskStatus from '.';
import { render, screen } from '@/test-utils/testUtils';

describe('TaskStatus', () => {
  test('should render pending status in yellow', () => {
    render(<TaskStatus status={'pending'} />);
    const statusElement = screen.getByText('pending');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('bg-yellow-300');
  });

  test('should render overdue status in red', () => {
    render(<TaskStatus status={'overdue'} />);
    const statusElement = screen.getByText('overdue');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('bg-red-600');
  });

  test('should render overdue status in green', () => {
    render(<TaskStatus status={'completed'} />);
    const statusElement = screen.getByText('completed');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('bg-green-300');
  });
});
