import Card, { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const ProfileCardStyled = styled(Card, {
  shouldForwardProp: (props) => props !== 'isProfileComplete',
})<CardProps & { isProfileComplete?: boolean }>(
  ({ isProfileComplete, theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...(!isProfileComplete && {
      backgroundColor: theme.palette.regalBlue.main,
      border: 'none',
    }),
  })
);
