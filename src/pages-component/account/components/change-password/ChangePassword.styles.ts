import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: '24px',
}));

export const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '16px',
}));
