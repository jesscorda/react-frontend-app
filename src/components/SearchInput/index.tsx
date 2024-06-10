import React from 'react';
import Input from '../Input/Input';

interface InputProps {
  onFilterTable: (value: string) => void;
}

const SearchInput = ({ onFilterTable }: InputProps) => {
  return (
    <Input placeholder="Search Items" onChange={(event) => onFilterTable(event.target.value)} />
  );
};

export default SearchInput;
