import React, { InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  const elementId = useId();
  const errorId = useId();

  return (
    <div className="flex flex-col p-3 w-full">
      {label && (
        <label htmlFor={elementId} className="text-gray-600 text-sm">
          {label}
          {rest.required && '*'}
        </label>
      )}
      <input
        className="outline-none bg-gray-100 p-2 mt-1 rounded-md w-full"
        id={elementId}
        aria-describedby={errorId}
        {...rest}
      />
    </div>
  );
};

export default Input;
