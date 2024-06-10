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

const DataTable = <T extends { id: number }>({
  columns,
  rows,
  onDeleteRow,
  onEditRow,
}: InputProps<T>) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
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
          <tr className="border-b" key={row.id}>
            {columns.map((column, index) =>
              column === 'status' ? (
                <td key={column}>
                  {'status' in row && <TaskStatus status={row.status as Status} />}
                </td>
              ) : (
                <td key={index} className="p-2">
                  {row[column] as React.ReactNode}
                </td>
              ),
            )}
            <td className="p-2 flex gap-3">
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
