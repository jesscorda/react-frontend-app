import React from 'react';
import Toolbar from '.';
import { render, screen } from '@/test-utils/testUtils';

describe('Toolbar', () => {
  test('should render toolbar with label and children', () => {
    render(<Toolbar label="Test Toolbar">Test Children</Toolbar>);

    const labelElement = screen.getByText('Test Toolbar');
    const childrenElement = screen.getByText('Test Children');

    expect(labelElement).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
  });

  test('should render toolbar with correct label', () => {
    render(<Toolbar label="Custom Label">Test Children</Toolbar>);

    const labelElement = screen.getByText('Custom Label');

    expect(labelElement).toBeInTheDocument();
  });

  test('should render toolbar with correct children', () => {
    render(<Toolbar label="Test Toolbar">Custom Children</Toolbar>);

    const childrenElement = screen.getByText('Custom Children');

    expect(childrenElement).toBeInTheDocument();
  });
});
