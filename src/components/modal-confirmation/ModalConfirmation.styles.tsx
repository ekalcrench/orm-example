import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CenteredBox } from '@/styles';
import Paper from '@mui/material/Paper';

export const DialogPaperComponent = styled(Paper)(() => ({
  padding: '1.5rem',
  background: '#ffffff',
  boxShadow: '0rem 0.25rem 0.625rem rgba(31, 53, 163, 0.1)',
  borderRadius: '0.5rem',
  width: '17rem',
  minHeight: '15rem',
  height: 'auto',
  zIndex: 999999999,
}));

export const TitleDialog = styled(DialogTitle)(() => ({
  padding: 0,
}));

export const IconWrapperBox = styled(CenteredBox)(() => ({
  marginBottom: '1rem',
  marginTop: '1rem',
}));

export const IconWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100px',
  height: '100px',
}));

export const ContentDialogText = styled(Typography)(() => ({
  fontSize: '1rem',
  textAlign: 'center',
}));

export const ActionsDialogWarning = styled(CenteredBox)(() => ({
  padding: 0,
  marginTop: '2rem',
}));
