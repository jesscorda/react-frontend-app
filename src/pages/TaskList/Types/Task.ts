import { Role } from '@/pages/Users/types/Role';

export interface Task {
  id: string;
  title: string;
  description: string;
  endDate: string;
  status: Status;
  createdBy: Role;
}

export type Status = 'pending' | 'overdue' | 'completed';
