'use client';

import { useState } from 'react';

import { ModalConfirmationProps } from '@/components/modal-confirmation/ModalConfirmation.types';

const defaultDialogProps = { isOpen: false, message: '' };

export default function useDialog() {
  const [dialogProps, setDialogProps] = useState(defaultDialogProps);

  const hideDialog = () => setDialogProps(defaultDialogProps);

  const setDialogWarning = (props: Partial<ModalConfirmationProps>) => {
    setDialogProps({
      isOpen: true,
      message: props.message ?? 'Attention',
      ...props,
    });
  };

  return {
    dialogProps,
    hideDialog,
    setDialogProps,
    defaultDialogProps,
    setDialogWarning,
  };
}
