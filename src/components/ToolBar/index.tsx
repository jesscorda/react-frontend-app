import React from 'react';

interface InputProps {
  children: React.ReactNode;
}

const Toolbar = ({ children }: InputProps) => {
  return (
    <>
      <div className="bg-white p-2 flex items-center justify-between">{children}</div>
    </>
  );
};

export default Toolbar;
