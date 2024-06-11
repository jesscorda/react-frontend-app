import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface InputProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ open, children, onClose }: InputProps) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialogRef = dialog.current;
    if (!dialogRef) return;
    if (open) {
      dialogRef.showModal();
    } else {
      dialogRef.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      data-testid="modal"
      className={`modal ${open ? 'block' : 'hidden'}`}
      ref={dialog}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Modal;
