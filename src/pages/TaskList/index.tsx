import React, { useEffect, useState } from 'react';
import { Task } from './Types/Task';
import { SORT_OPTIONS } from './Types/SortOptions';
import { sortFunctions } from './utils/sort';
import DataTable from '@/components/Table';
import Toolbar from '@/components/ToolBar';
import Modal from '@/components/Modal';
import UpdateTask from '@/components/UpdateTask';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Button from '@/components/Button';
import SearchInput from '@/components/SearchInput';
import useLocalStorage from '@/hooks/useLocalStorage';
import Dropdown from '@/components/Dropdown';

const TABLE_HEADERS = ['title', 'description', 'status', 'createdBy', 'endDate'] as Array<
  keyof Task
>;

const TaskList = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const [transformedTasks, setTransformedTasks] = useState<Task[]>(tasks);

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<boolean>(false);

  const [savedTask, setSavedTask] = useState<Task>();

  const [taskToBeUpdated, setTaskToBeUpdated] = useState<Task | null>(null);

  const [taskToBeDeleted, setTaskToBeDeleted] = useState<Task | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);

  useEffect(() => {
    if (!savedTask) return;
    const taskIndex = tasks.findIndex((task) => task.id === savedTask.id);

    setTasks((currentTasks) => {
      if (taskIndex === -1) {
        return [...currentTasks, savedTask];
      } else {
        const updatedTasks = [...currentTasks];
        updatedTasks[taskIndex] = savedTask;
        return updatedTasks;
      }
    });

    setOpenUpdateModal(false);
    setTaskToBeUpdated(null);
  }, [savedTask]);

  useEffect(() => {
    const filteredTasks = tasks
      .filter((task) =>
        Object.values(task).some((val: number | string) => val.toString().includes(searchTerm)),
      )
      .sort(sortFunctions[sortOption])
      .map((task) => {
        if (new Date(task.endDate) < new Date() && task.status === 'pending') {
          task.status = 'overdue';
        }
        return task;
      });
    setTransformedTasks(filteredTasks);
  }, [searchTerm, sortOption, tasks]);

  const handleAddTask = () => {
    setOpenUpdateModal(true);
  };

  const handleEditTask = (task: Task) => {
    setOpenUpdateModal(true);
    setTaskToBeUpdated(task);
  };

  const handleDeleteTask = (task: Task) => {
    setOpenDeleteConfirmationModal(true);
    setTaskToBeDeleted(task);
  };

  const handleDeleteConfirm = () => {
    setTasks((tasks) => {
      const taskIndex = tasks.findIndex((task) => task.id === taskToBeDeleted?.id);
      return tasks.filter((_, index) => index === taskIndex);
    });
    setOpenDeleteConfirmationModal(false);
  };

  return (
    <div>
      <Modal open={openDeleteConfirmationModal}>
        <DeleteConfirmation
          onDelete={handleDeleteConfirm}
          onCancel={() => setOpenDeleteConfirmationModal(false)}
        />
      </Modal>
      <Modal open={openUpdateModal}>
        <UpdateTask
          onCancel={() => setOpenUpdateModal(false)}
          onSubmitData={setSavedTask}
          task={taskToBeUpdated}
        />
      </Modal>
      <Toolbar>
        <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
        <SearchInput onFilterTable={(searchTerm) => setSearchTerm(searchTerm)} />
        <div className="flex items-center space-x-2">
          <Button label=" Add Task" buttonType="basic" onClick={handleAddTask} />
          <Dropdown
            defaultValue="title"
            onSelect={(option) => setSortOption(option)}
            options={SORT_OPTIONS}
          />
        </div>
      </Toolbar>
      <DataTable<Task>
        columns={TABLE_HEADERS}
        rows={transformedTasks}
        onEditRow={(task) => handleEditTask(task)}
        onDeleteRow={(task) => handleDeleteTask(task)}
      />
    </div>
  );
};

export default TaskList;
