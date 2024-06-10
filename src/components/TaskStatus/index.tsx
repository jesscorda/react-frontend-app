import React from 'react';
import { Status } from '@/pages/TaskList/Types/Task';

const STATUS_COLORS = {
  pending: 'bg-yellow-300',
  overdue: 'bg-red-600',
  completed: 'bg-green-300',
};

const TaskStatus = ({ status }: { status: Status }) => {
  return (
    <span className={`capitalize ${STATUS_COLORS[status]} p-1 rounded-lg text-sm`}>{status}</span>
  );
};

export default TaskStatus;
