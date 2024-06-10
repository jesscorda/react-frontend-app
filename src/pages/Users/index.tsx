import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import SearchInput from '@/components/SearchInput';
import DataTable from '@/components/Table';
import useLocalStorage from '@/hooks/useLocalStorage';
import Modal from '@/components/Modal';
import Toolbar from '@/components/ToolBar';
import Button from '@/components/Button';
import UpdateUser from '@/components/UpdateUser';

const TABLE_HEADERS = ['username', 'role'] as Array<keyof User>;

const Users = () => {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);

  const [transformedUsers, setTransformedUsers] = useState<User[]>(users ?? []);

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState<boolean>(false);

  const [savedTask, setSavedTask] = useState<User>();

  const [userToBeUpdated, setTaskToBeUpdated] = useState<User | null>(null);

  const [userToBeDeleted, setTaskToBeDeleted] = useState<User | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!savedTask) return;
    if (!users) return;
    const userIndex = users.findIndex((user) => user.id === savedTask.id);

    setUsers((currentUsers) => {
      if (!currentUsers) return [];
      if (userIndex === -1) {
        return [...currentUsers, savedTask];
      } else {
        const updatedUsers = [...currentUsers];
        updatedUsers[userIndex] = savedTask;
        return updatedUsers;
      }
    });

    setOpenUpdateModal(false);
    setTaskToBeUpdated(null);
  }, [savedTask]);

  useEffect(() => {
    if (!users) return;
    const filteredUsers = users.filter((user) =>
      Object.values(user).some((val: number | string) => val.toString().includes(searchTerm)),
    );

    setTransformedUsers(filteredUsers);
  }, [searchTerm, users]);

  const handleAddTask = () => {
    setOpenUpdateModal(true);
  };

  const handleEditTask = (user: User) => {
    setOpenUpdateModal(true);
    setTaskToBeUpdated(user);
  };

  const handleDeleteTask = (user: User) => {
    setOpenDeleteConfirmationModal(true);
    setTaskToBeDeleted(user);
  };

  const handleDeleteConfirm = () => {
    setUsers((users) => {
      if (!users) return [];
      const userIndex = users.findIndex((user) => user.id === userToBeDeleted?.id);
      return users.filter((_, index) => index === userIndex);
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
        <UpdateUser
          onCancel={() => setOpenUpdateModal(false)}
          onSubmitData={setSavedTask}
          user={userToBeUpdated}
        />
      </Modal>
      <Toolbar label="Users">
        <div className="w-20 md:w-full">
          <Button label=" Add User" buttonType="basic" onClick={handleAddTask} />
        </div>
        <div className="w-20 md:w-full">
          <SearchInput onFilterTable={(searchTerm) => setSearchTerm(searchTerm)} />
        </div>
      </Toolbar>
      <DataTable<User>
        columns={TABLE_HEADERS}
        rows={transformedUsers}
        onEditRow={(user) => handleEditTask(user)}
        onDeleteRow={(user) => handleDeleteTask(user)}
      />
    </div>
  );
};

export default Users;
