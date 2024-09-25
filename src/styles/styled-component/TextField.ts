import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import { CustomTextFieldProps } from '@/types';

export const CustomTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== 'isNotEmpty',
})<CustomTextFieldProps>(
  ({ disabled, error, isNotEmpty, theme: { palette, breakpoints } }) => ({
    width: '100%',
    ...(disabled && {
      backgroundColor: palette.concrete.main,
    }),

    '.MuiOutlinedInput-root': {
      borderRadius: '8px',
      color: palette.primary.main,
      '& input': {
        paddingLeft: '20px',
        paddingRight: '20px',

        [breakpoints.down(600)]: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },

    '.MuiOutlinedInput-input': {
      padding: 0,
      height: '54px',
      color: error ? palette.error.main : palette.primary.main,
      fontWeight: 500,

      [breakpoints.down(600)]: {
        height: '48px',
      },

      '&:focus': {
        color: palette.primary.main,
      },

      '&::placeholder': {
        color: palette.input.placeholder,
        fontWeight: 400,
        opacity: 1,
      },

      '&.Mui-disabled': {
        cursor: 'not-allowed',
      },
    },

    '.MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${
        error
          ? palette.error.main
          : isNotEmpty
          ? palette.primary.main
          : palette.input.borderColor
      }`,
    },
  })
);
