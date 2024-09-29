import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const DashboardContainer = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '1000px',
  margin: 'auto',
  padding: '32px',
  [theme.breakpoints.down(1024)]: {
    width: '100%',
  },
}));

export const Avatar = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  marginRight: '10px',
  width: '40px',
  height: '40px',

  // [theme.breakpoints.down(600)]: {
  //   marginRight: '6px',
  //   width: '28px',
  //   height: '28px',
  // },
}));
