import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ADMIN } from '../Users/types/User';
import { Task } from './Types/Task';
import TaskList from '.';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAuth } from '@/context/authContext';

jest.mock('@/context/authContext');
jest.mock('@/hooks/useLocalStorage');

describe('TaskList', () => {
  const mockSetTasks = jest.fn();
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      createdBy: 'ADMIN',
      endDate: '2023-01-01',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'completed',
      createdBy: 'OWNER',
      endDate: '2023-02-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: ADMIN,
    });
    (useLocalStorage as jest.Mock).mockReturnValue([mockTasks, mockSetTasks]);

    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  const renderTasksList = () => {
    document.body.innerHTML = '<div id="modal" />';
    return render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>,
    );
  };

  test('should render the TaskList component with tasks', () => {
    renderTasksList();

    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('should filter tasks based on search term', () => {
    renderTasksList();

    fireEvent.change(screen.getByPlaceholderText('Search Items'), { target: { value: 'Task 1' } });

    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  test('should sort tasks based on selected option', () => {
    renderTasksList();
    fireEvent.change(screen.getByDisplayValue('Sort By Ascending Title'), {
      target: { value: 'endDateAsc' },
    });
    const sortedTasks = screen.getAllByRole('row');
    expect(sortedTasks[1].textContent).toContain('Task 1');
    expect(sortedTasks[2].textContent).toContain('Task 2');
  });
});
