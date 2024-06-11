import React, { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button';
import Dropdown, { DropdownOption } from '../Dropdown';
import Input from '../Input/Input';
import { User } from '@/pages/Users/types/User';
import { Role } from '@/pages/Users/types/Role';

interface InputProps {
  onCancel?: () => void;
  onSubmitData: (user: User) => void;
  user: User | null;
}

const ROLE_UPTDATE_OPTIONS: DropdownOption[] = [
  {
    label: 'ADMIN',
    value: 'ADMIN',
  },
  {
    label: 'OWNER',
    value: 'OWNER',
  },
];

const UpdateUser = ({ onCancel, onSubmitData, user }: InputProps) => {
  const newId = uuidv4();

  const [formData, setFormData] = useState<User>({
    username: user?.username ?? '',
    role: user?.role ?? 'ADMIN',
    id: user?.id ?? newId,
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

  const handleRoleUpdateChange = (selectedValue: Role) => {
    setFormData((formData) => ({ ...formData, role: selectedValue }));
  };

  return (
    <div className="flex flex-col p-4">
      <p className="text-xl font-semibold">Add User</p>
      <form className="mt-5" onSubmit={(event) => handleSave(event)} data-testid="form">
        <Input
          type="text"
          label="Username"
          name="username"
          value={formData?.username}
          onChange={handleInputChange}
        />
        <Dropdown
          label="Role"
          defaultValue={formData.role}
          options={ROLE_UPTDATE_OPTIONS}
          onSelect={(selectedValue) => handleRoleUpdateChange(selectedValue as Role)}
        />

        <div className="mt-5 flex gap-5 justify-end">
          <Button label="Save" buttonType="basic" />
          <Button type="button" label="Cancel" buttonType="cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
