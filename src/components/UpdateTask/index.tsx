import React, { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input/Input';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { STATUS_UPTDATE_OPTIONS } from './StatusUpdateOptions';
import { Status, Task } from '@/pages/TaskList/Types/Task';
import { useAuth } from '@/context/authContext';

interface InputProps {
  onCancel?: () => void;
  onSubmitData: (task: Task) => void;
  task: Task | null;
}

const UpdateTask = ({ onCancel, onSubmitData, task }: InputProps) => {
  const { user } = useAuth();

  const newId = uuidv4();

  const [formData, setFormData] = useState<Task>({
    createdBy: task?.createdBy ?? user?.role ?? 'OWNER',
    description: task?.description ?? '',
    endDate: task?.endDate ?? '',
    status: task?.status ?? 'pending',
    title: task?.title ?? '',
    id: task?.id ?? newId,
  });

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.target) return;
    onSubmitData(formData);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleStatusUpdateChange = (selectedValue: Status) => {
    setFormData((formData) => ({ ...formData, status: selectedValue }));
  };

  return (
    <div className="flex flex-col p-4">
      <p className="text-xl font-semibold">Add Task</p>
      <form className="mt-5" onSubmit={(event) => handleSave(event)} data-testid="form">
        <Input
          type="text"
          label="Title"
          name="title"
          value={formData?.title}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          label="Description"
          name="description"
          value={formData?.description}
          onChange={handleInputChange}
          required
        />
        <Input
          type="date"
          label="End Date"
          name="endDate"
          value={formData?.endDate}
          onChange={handleInputChange}
          required
        />
        <Dropdown
          label="Status"
          defaultValue={formData.status}
          options={STATUS_UPTDATE_OPTIONS}
          onSelect={(selectedValue) => handleStatusUpdateChange(selectedValue as Status)}
        />

        <div className="mt-5 flex gap-5 justify-end">
          <Button label="Save" buttonType="basic" />
          <Button type="button" label="Cancel" buttonType="outline" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
