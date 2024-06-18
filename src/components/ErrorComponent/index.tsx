import React from 'react';

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
      </div>
    </div>
  );
};

export default ErrorComponent;
