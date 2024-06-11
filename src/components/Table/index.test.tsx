import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DataTable from '.';

const columns = ['name', 'status'];
const rows = [
  { id: '1', name: 'Task 1', status: 'Pending' },
  { id: '2', name: 'Task 2', status: 'Completed' },
];

describe('DataTable', () => {
  test('should render table with rows and columns', () => {
    render(<DataTable columns={columns} rows={rows} onEditRow={() => {}} onDeleteRow={() => {}} />);
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('actions')).toBeInTheDocument();

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();

    expect(screen.getAllByText('Edit')).toHaveLength(rows.length);
    expect(screen.getAllByText('Delete')).toHaveLength(rows.length);
  });

  test('should call onEditRow and onDeleteRow with correct row data', () => {
    const mockOnEditRow = jest.fn();
    const mockOnDeleteRow = jest.fn();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        onEditRow={mockOnEditRow}
        onDeleteRow={mockOnDeleteRow}
      />,
    );

    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(mockOnEditRow).toHaveBeenCalledWith(rows[0]);

    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(mockOnDeleteRow).toHaveBeenCalledWith(rows[1]);
  });
});
