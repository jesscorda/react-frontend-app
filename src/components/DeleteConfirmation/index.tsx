import React from 'react';
import Button from '../Button';

interface InputProps {
  onCancel?: () => void;
  onDelete: () => void;
}

const DeleteConfirmation = ({ onCancel, onDelete }: InputProps) => {
  return (
    <div className="flex flex-col p-4">
      <p className="text-xl">Delete Confirmation</p>
      <p className="mt-5">Are you sure you want to delete this item?</p>
      <div className="mt-5 flex gap-5 justify-end">
        <Button type="button" label="Delete" buttonType="danger" onClick={onDelete} />
        <Button type="button" label="Cancel" buttonType="cancel" onClick={onCancel} />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
