import React, { InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  errorMessage?: string;
  label?: string;
}

const Input = ({ isValid, errorMessage, label, ...rest }: InputProps) => {
  const elementId = useId();
  const errorId = useId();

  return (
    <div className="flex flex-col p-3">
      {label && (
        <label htmlFor={elementId} className="text-gray-600 text-sm">
          {label}
        </label>
      )}
      <input
        className="outline-none bg-gray-100 p-2 mt-1 rounded-md w-full"
        id={elementId}
        aria-invalid={!isValid}
        aria-describedby={errorId}
        {...rest}
      />
      <p id={errorId} className="error-message" role="alert" aria-hidden={isValid}>
        {errorMessage}
      </p>
    </div>
  );
};

export default Input;
