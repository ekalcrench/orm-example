import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Avatar = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  marginRight: '8px',
  width: '32px',
  height: '32px',

  [theme.breakpoints.down(600)]: {
    marginRight: '6px',
    width: '28px',
    height: '28px',
  },
}));
