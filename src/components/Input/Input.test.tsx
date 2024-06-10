import React from 'react';

import { render, screen } from '@testing-library/react';
import Input from '@/components/Input/Input';

describe('Input', () => {
  test('renders with props', () => {
    const label = 'input-label';
    render(<Input isValid label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test('renders with error', async () => {
    const label = 'invalid-field';
    const errorMessage = 'field is invalid';
    render(<Input isValid={false} label={label} errorMessage={errorMessage} />);

    const input = screen.getByLabelText(label);
    const errorField = screen.getByRole('alert');

    expect(input).toBeInvalid();
    expect(errorField).toBeInTheDocument();
    expect(errorField).toHaveTextContent(errorMessage);
  });
});
