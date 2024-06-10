import React from 'react';

interface InputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: keyof typeof BUTTON_COLORS;
  label: string;
}

const BUTTON_COLORS = {
  basic: 'bg-blue-950 text-white',
  outline: 'border-blue-950 border text-black',
  cancel: 'bg-gray-400 text-black',
  danger: 'bg-red-700 text-black',
};

const Button = ({ buttonType, label, ...rest }: InputProps) => {
  return (
    <button
      className={`px-3 py-2 rounded-md ${BUTTON_COLORS[buttonType]} ${rest.disabled && 'opacity-70 cursor-not-allowed'}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
