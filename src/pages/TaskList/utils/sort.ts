import { Task } from '../Types/Task';

export const sortFunctions: { [key: string]: (a: Task, b: Task) => number } = {
  titleAsc: (a, b) => a.title.localeCompare(b.title),
  titleDesc: (a, b) => b.title.localeCompare(a.title),
  descriptionAsc: (a, b) => a.description.localeCompare(b.description),
  descriptionDesc: (a, b) => b.description.localeCompare(a.description),
  endDateAsc: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
  endDateDesc: (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
  statusAsc: (a, b) => a.status.localeCompare(b.status),
  statusDesc: (a, b) => b.status.localeCompare(a.status),
};
