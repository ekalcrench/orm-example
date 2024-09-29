import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card, { CardProps } from '@mui/material/Card';
import { alpha, styled } from '@mui/material/styles';

import backgroundDoodle from '@/static/svg/background-doodle.svg';
import { BoxFlexEnd, CenteredFullWidthBox, SpaceBetweenBox } from '@/styles';

export const QmeCard = styled(Card)(() => ({
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

export const QmeCardInpuText = styled(Card)(() => ({
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
  width: '60px',
  height: '60px',
  marginRight: '16px',
}));
