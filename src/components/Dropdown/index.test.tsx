import React from 'react';
import Dropdown, { DropdownOption } from '.';
import { fireEvent, render, screen } from '@/test-utils/testUtils';

describe('Dropdown', () => {
  const handleSelect = jest.fn();

  const OPTIONS: DropdownOption[] = [
    {
      label: 'First',
      value: '1',
    },
    {
      label: 'Second',
      value: '2',
    },
  ];

  const renderDropdownComponent = (label = '') =>
    render(<Dropdown options={OPTIONS} defaultValue="1" onSelect={handleSelect} label={label} />);

  test('should render the dropdown', () => {
    renderDropdownComponent('Test');
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('First')).toBeInTheDocument();
    OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('should call handleSelect when an option is selected', () => {
    renderDropdownComponent('Test');
    const selectElement = screen.getByDisplayValue('First') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(handleSelect).toHaveBeenCalledWith('2');
    expect(selectElement.value).toBe('2');
  });

  test('should render without label when label is not provided', () => {
    render(<Dropdown options={OPTIONS} defaultValue="1" onSelect={handleSelect} />);
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });
});
