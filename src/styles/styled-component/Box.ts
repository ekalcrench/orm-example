import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const BoxFieldWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== 'renderErrorMessage',
})<BoxProps & { renderErrorMessage?: boolean }>(
  ({ renderErrorMessage, theme: { breakpoints } }) => ({
    position: 'relative',
    ...(renderErrorMessage && {
      paddingBottom: '1.25rem',

      [breakpoints.down(600)]: {
        paddingBottom: '1rem',
      },
    }),
  })
);

export const LeftBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const SpaceBetweenBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const BoxFlexEnd = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

export const BoxFullEnd = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
}));

export const CenteredBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CenteredFullWidthBox = styled(CenteredBox)(() => ({
  width: '100%',
}));

export const CenteredFullHeightBox = styled(CenteredBox)(() => ({
  height: '100%',
}));

export const CenteredFullHeightColumnBox = styled(CenteredBox)(() => ({
  height: '100%',
  flexDirection: 'column',
}));

export const CenteredFullBox = styled(CenteredBox)(() => ({
  width: '100%',
  height: '100%',
}));
