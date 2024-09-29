'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import warningIcon from '@/static/svg/warning-icon.svg';
import { CenteredBox } from '@/styles';
import CustomImage from '../custom-image';
import {
  TitleDialog,
  IconWrapperBox,
  IconWrapper,
  ContentDialogText,
  ActionsDialogWarning,
  DialogPaperComponent,
} from './ModalConfirmation.styles';
import { ModalConfirmationProps } from './ModalConfirmation.types';

export default function ModalConfirmation({
  cancelText,
  confirmText,
  message,
  title,
  dialogProps,
  isOpen,
  onCancel,
  onConfirm,
}: ModalConfirmationProps) {
  return (
    <Dialog
      {...dialogProps}
      open={isOpen}
      PaperComponent={DialogPaperComponent}>
      <TitleDialog>
        <Typography variant={'h6'} align="center" fontWeight={600}>
          {title ?? 'Warning!'}
        </Typography>
      </TitleDialog>

      <IconWrapperBox>
        <IconWrapper>
          <CustomImage src={warningIcon.src} alt="warning" fill />
        </IconWrapper>
      </IconWrapperBox>

      <CenteredBox>
        <ContentDialogText>{message}</ContentDialogText>
      </CenteredBox>

      <ActionsDialogWarning>
        <Button onClick={onConfirm} sx={{ width: '6rem', marginRight: '1rem' }}>
          {confirmText ?? 'Iya'}
        </Button>

        <Button onClick={onCancel} color="error" sx={{ width: '6rem' }}>
          {cancelText ?? 'Tidak'}
        </Button>
      </ActionsDialogWarning>
    </Dialog>
  );
}
