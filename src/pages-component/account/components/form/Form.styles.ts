import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ProfileContainer = styled('section')(({ theme }) => ({
  padding: '48px 15vw',
  boxSizing: 'border-box',
  minHeight: 'calc(100vh - 210px)',
  backgroundColor: theme.palette.concrete.main,
  [theme.breakpoints.between(900, 1100)]: {
    paddingLeft: '10vw',
    paddingRight: '10vw',
  },
  [theme.breakpoints.down(600)]: {
    padding: '32px 5vw',
  },
}));

export const ProfileCard = styled(Box)(({ theme }) => ({
  width: '900px',
  margin: 'auto',
}));
