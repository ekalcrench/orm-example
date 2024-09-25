import Box, { BoxProps } from '@mui/material/Box';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

export const CheckboxStyle = styled(Checkbox)<CheckboxProps>(() => ({
  padding: 0,
  borderRadius: '8px',
}));

export const CheckboxWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
}));
