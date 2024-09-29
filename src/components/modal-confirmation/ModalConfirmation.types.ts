import { DialogProps } from '@mui/material/Dialog';

export interface ModalConfirmationProps {
  confirmText?: string;
  cancelText?: string;
  message: string;
  title?: string;
  dialogProps?: Omit<DialogProps, 'open'>;
  onCancel?(): void;
  onConfirm?(): void;
  isOpen: boolean;
}
