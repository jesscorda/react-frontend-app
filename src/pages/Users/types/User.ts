import { Role } from './Role';

export interface User {
  id: number;
  role: Role;
  username: string;
}

export const ADMIN: User = {
  id: 1,
  username: 'admin',
  role: 'ADMIN',
};
