import { useEffect, useRef, useContext, ReactNode } from "react";
import { createPortal } from "react-dom";
import UserProgressContex from "../../store/UserProgressContex";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  className?: string;
  onClose?: () => void;
}
export default function Modal({
  children,
  open,
  className = " ",
  onClose,
}: ModalProps): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal");
  // const progressCtx = useContext(UserProgressContex);
  useEffect(() => {
    const modal = dialog.current!;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot!
  );
}
