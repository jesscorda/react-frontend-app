import React from 'react';
import UpdateTask from '.';
import { Task } from '@/pages/TaskList/Types/Task';
import { fireEvent, render, screen } from '@/test-utils/testUtils';

describe('UpdateTask', () => {
  const task: Task = {
    id: '1',
    title: 'Task Title',
    description: 'Task Description',
    endDate: '2022-12-31',
    status: 'pending',
    createdBy: 'OWNER',
  };

  test('should render update task form with initial values', () => {
    render(<UpdateTask task={task} onSubmitData={jest.fn()} />);
    expect(screen.getByLabelText('Title*')).toHaveValue('Task Title');
    expect(screen.getByLabelText('Description*')).toHaveValue('Task Description');
    expect(screen.getByLabelText('End Date*')).toHaveValue('2022-12-31');
    expect(screen.getByLabelText('Status')).toHaveValue('pending');
  });

  test('should call onSubmitData when form is submitted with updated task data', () => {
    const mockSubmitData = jest.fn();
    render(<UpdateTask task={task} onSubmitData={mockSubmitData} />);
    fireEvent.change(screen.getByLabelText('Title*'), { target: { value: 'New Task Title' } });
    fireEvent.change(screen.getByLabelText('Description*'), {
      target: { value: 'New Task Description' },
    });
    fireEvent.change(screen.getByLabelText('End Date*'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'completed' } });
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockSubmitData).toHaveBeenCalledWith({
      id: '1',
      title: 'New Task Title',
      description: 'New Task Description',
      endDate: '2023-01-01',
      status: 'completed',
      createdBy: 'OWNER',
    });
  });

  test('should call onCancel when cancel button is clicked', () => {
    const mockCancel = jest.fn();
    render(<UpdateTask task={task} onSubmitData={jest.fn()} onCancel={mockCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCancel).toHaveBeenCalled();
  });
});
