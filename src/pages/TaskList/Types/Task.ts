export interface Task {
  id: number;
  title: string;
  description: string;
  endDate: string;
  status: Status;
  createdBy: string;
}

export type Status = 'pending' | 'overdue' | 'completed';
