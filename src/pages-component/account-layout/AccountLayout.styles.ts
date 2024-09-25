import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ProfileContainer = styled('section')(({ theme }) => ({
  padding: '48px 0px',
  boxSizing: 'border-box',
  minHeight: 'calc(100vh - 210px)',
  backgroundColor: theme.palette.concrete.main,
  [theme.breakpoints.between(900, 950)]: {
    paddingLeft: '5vw',
    paddingRight: '5vw',
  },
  [theme.breakpoints.down(600)]: {
    padding: '32px 5vw',
  },
}));

export const ProfileCard = styled(Box)(({ theme }) => ({
  width: '900px',
  margin: 'auto',
  [theme.breakpoints.between(900, 950)]: {
    width: 'auto',
  },
  [theme.breakpoints.between(600, 900)]: {
    width: '580px',
  },
  [theme.breakpoints.down(600)]: {
    width: 'auto',
  },
}));

export const MenuButton = styled(Button)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));
