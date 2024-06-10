import React from 'react';

interface InputProps {
  children: React.ReactNode;
  label: string;
}

const Toolbar = ({ children, label }: InputProps) => {
  return (
    <>
      <div className="bg-white pl-4 md:p-2 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{label}</h1>
        <div className="flex justify-center items-center"> {children}</div>
      </div>
    </>
  );
};

export default Toolbar;
