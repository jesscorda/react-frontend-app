import React from 'react';
import { fireEvent, render, screen } from '../../test-utils/testUtils';
import Button from '.';

describe('Button', () => {
  test('should display a button with a value', () => {
    render(<Button label="Test" />);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-950 text-white');
  });

  test('should display a button of type outline', () => {
    render(<Button label="Test" buttonType="outline" />);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border-blue-950 border text-black');
  });

  test('should display a button of type cancel', () => {
    render(<Button label="Test" buttonType="cancel" />);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-gray-400 text-black');
  });

  test('should display a button of type danger', () => {
    render(<Button label="Test" buttonType="danger" />);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-700 text-black');
  });

  test('should trigger a handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Test" onClick={handleClick} />);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not make it possible to interact with the button if it is disabled', () => {
    render(<Button label="Test" disabled />);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('opacity-70 cursor-not-allowed');
  });
});
