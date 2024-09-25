import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',
  marginBottom: '34px',
}));

export const Avatar = styled('img')(({ theme }) => ({
  position: 'relative',
  width: '224px',
  height: '224px',
  borderRadius: '50%',
  [theme.breakpoints.down(600)]: {
    width: '200px',
    height: '200px',
  },
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: '24px',
}));

export const InlineButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '54px',
  position: 'absolute',
  bottom: '1.25rem',
  [theme.breakpoints.down(600)]: {
    height: '48px',
  },
}));

export const LabelChooseFile = styled('label')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.secondary.main,
  color: 'white',
  cursor: 'pointer',
  transition: 'background 0.3s',
  height: '54px',
  paddingLeft: '20px',
  paddingRight: '20px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  fontSize: '0.875rem',
  // '&:hover': {
  //   background: alpha(theme.palette.secondary.main, 0.5),
  // },
  [theme.breakpoints.down(600)]: {
    height: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
}));
