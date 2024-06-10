import * as React from 'react';
import TaskStatus from '../TaskStatus';
import Button from '../Button';
import { Status } from '@/pages/TaskList/Types/Task';

interface InputProps<T> {
  columns: Array<keyof T>;
  rows: Array<T>;
  onEditRow: (rowData: T) => void;
  onDeleteRow: (rowData: T) => void;
}

const DataTable = <T extends { id: string }>({
  columns,
  rows,
  onDeleteRow,
  onEditRow,
}: InputProps<T>) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="hidden lg:table-header-group">
        <tr className="border-b">
          {[...columns, 'actions'].map((header, index) => (
            <th key={index} className="p-2 capitalize text-left">
              {header as string}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className="border-b flex flex-col p-2 lg:p-0 lg:table-row" key={row.id}>
            {columns.map((column, index) =>
              column === 'status' ? (
                <td key={column} className="p-2 grid grid-cols-2 lg:table-cell">
                  <span className="capitalize lg:hidden font-bold mr-2">
                    {column as React.ReactNode}:
                  </span>
                  {'status' in row && <TaskStatus status={row.status as Status} />}
                </td>
              ) : (
                <td key={index} className="p-2 grid grid-cols-2 lg:table-cell">
                  <span className="capitalize lg:hidden font-bold">
                    {column as React.ReactNode}:
                  </span>{' '}
                  {row[column] as React.ReactNode}
                </td>
              ),
            )}
            <td className="p-2 grid grid-cols-2 lg:flex gap-3">
              <Button label="Edit" buttonType="basic" onClick={() => onEditRow(row)} />
              <Button label="Delete" buttonType="danger" onClick={() => onDeleteRow(row)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
