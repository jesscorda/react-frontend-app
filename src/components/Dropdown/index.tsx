import React, { useId, useState } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

interface InputProps {
  options: DropdownOption[];
  defaultValue: string;
  onSelect: (value: string) => void;
  label?: string;
}

const Dropdown = ({ options, defaultValue, onSelect, label }: InputProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const elementId = useId();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <div className="flex flex-col p-3">
      {label && (
        <label htmlFor={elementId} className="text-gray-600 text-sm">
          {label}
        </label>
      )}
      <select
        id={elementId}
        className="outline-none bg-gray-100 p-2 mt-1 rounded-md"
        value={selectedValue}
        onChange={handleSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
