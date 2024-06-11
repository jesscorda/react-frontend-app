import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from '.';

jest.mock('../Input/Input', () => {
  return jest.fn((props) => (
    <input data-testid="mocked-input" onChange={(event) => props.onChange(event)} {...props} />
  ));
});

describe('SearchInput component', () => {
  test('calls onFilterTable with input value when input changes', () => {
    const mockOnFilterTable = jest.fn();
    render(<SearchInput onFilterTable={mockOnFilterTable} />);
    const inputElement = screen.getByTestId('mocked-input');
    fireEvent.change(inputElement, { target: { value: 'search query' } });
    expect(mockOnFilterTable).toHaveBeenCalledWith('search query');
  });
});
