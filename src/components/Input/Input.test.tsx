import React from 'react';

import { render, screen } from '@testing-library/react';
import Input from '@/components/Input/Input';

describe('Input', () => {
  test('renders with props', () => {
    const label = 'input-label';
    render(<Input label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test('renders required label with asterisk', () => {
    render(<Input label="Password" required />);
    const labelElement = screen.getByText('Password*');
    expect(labelElement).toBeInTheDocument();
  });
});
