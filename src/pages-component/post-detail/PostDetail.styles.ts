import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const PostDetailContainer = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '1000px',
  margin: 'auto',
  padding: '32px',
  [theme.breakpoints.down(1024)]: {
    width: '100%',
  },
}));

export const PostDetailCard = styled(Card)(() => ({
  boxSizing: 'border-box',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  padding: '12px 20px',
  borderTopLeftRadius: '24px',
  borderTopRightRadius: '24px',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderColor: 'white',
}));

export const PostDetailInpuText = styled(Card)(() => ({
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '12px 20px',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: '24px',
  borderBottomRightRadius: '24px',
  borderColor: 'white',
  backgroundColor: 'transparent',
}));

export const Avatar = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  marginRight: '10px',
  width: '56px',
  height: '56px',

  // [theme.breakpoints.down(600)]: {
  //   marginRight: '6px',
  //   width: '28px',
  //   height: '28px',
  // },
}));
