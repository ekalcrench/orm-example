import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const CustomLabel = styled(Typography)(() => ({
  marginBottom: '0.5rem',
}));

export const CustomErrorMessage = styled(Typography)(() => ({
  position: 'absolute',
  bottom: 0,
  marginLeft: '1rem',
  fontSize: '0.75rem',
}));
