import React from 'react';
import Modal from '.';
import { render, screen } from '@/test-utils/testUtils';

describe('Modal component', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  test('renders modal as hidden when open is false', () => {
    document.body.innerHTML = '<div id="modal" />';

    render(
      <Modal open={false}>
        <p>Modal Content</p>
      </Modal>,
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('renders modal as visible when open is true', () => {
    render(
      <Modal open={true}>
        <p>Modal Content</p>
      </Modal>,
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).toBeInTheDocument();
  });
});
