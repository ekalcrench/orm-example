'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { poppins } from './FontFamily';
import type {} from '@mui/x-date-pickers/themeAugmentation';

let theme = createTheme({
  palette: {
    mode: 'light',
    // Keppel Color
    primary: {
      main: '#62AD9E',
    },
    // Iceberg Color
    secondary: {
      main: '#79A8D7',
    },
    // Regal Blue Color
    regalBlue: {
      main: '#1D405C',
      light: '#2f5472a9',
    },
    // Tangerine Color
    tangerine: {
      main: '#FF9277',
      light: '#ffb8a6',
    },
    // Solomie Color
    solomie: {
      main: '#FFDD85',
    },
    // Concrete Color
    concrete: {
      main: '#F4F2F1',
    },
    success: {
      main: '#6EDD72',
    },
    warning: {
      main: '#FFD685',
    },
    error: {
      main: '#FA6666',
    },
    common: {
      white: '#FFFFFF',
    },
    text: {
      primary: '#1D405C',
    },
    input: {
      placeholder: '#B8B8B8',
      borderColor: '#E7E7E7',
    },
    card: {
      boxShadow: 'rgba(0, 0, 0, 0.1)',
      borderColor: '#E7E7E7',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,

    // 60px
    h2: {
      fontWeight: 600,
    },
    // 48px
    h3: {
      fontWeight: 600,
    },
    // 24px
    h5: {
      fontWeight: 400,
    },
    // 20px
    h6: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: ({ ownerState, theme: { palette, breakpoints } }) => ({
          textTransform: 'none',
          minHeight: '48px',
          padding: '8px 20px',
          borderRadius: '8px',
          minWidth: '0px',
          lineHeight: 1.4,
          ...(ownerState.variant === 'contained' && {
            boxShadow: 'none',
            color: palette.common.white,
            ':hover': {
              boxShadow: 'none',
            },
            ':focus': {
              boxShadow: 'none',
            },
            ...(ownerState.color === 'solomie' && {
              color: palette.text.primary,
            }),
          }),
          ...(ownerState.size === 'small' && {
            minHeight: '36px',
            padding: '6px 16px',
          }),
          [breakpoints.down(600)]: {
            minHeight: '40px',
            padding: '6px 16px',
          },
        }),
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'text.primary',
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ ownerState, theme: { palette, breakpoints } }) => ({
          padding: '24px 20px',
          borderRadius: '10px',
          boxSizing: 'border-box',
          fontFamily: poppins.style.fontFamily,
          ...(ownerState.variant === 'outlined' && {
            border: `2px solid ${palette.card.borderColor}`,
          }),
          ...(ownerState.variant === 'elevation' && {
            boxShadow: 'none',
          }),
          [breakpoints.down(600)]: {
            padding: '20px 16px',
          },
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: 0,
          '& .MuiOutlinedInput-root': {
            padding: 0,
          },
        },
        input: ({ theme: { breakpoints } }) => ({
          padding: '0px 20px !important',
          [breakpoints.down(600)]: {
            padding: '0px 16px !important',
          },
        }),
        inputRoot: ({ theme: { breakpoints } }) => ({
          paddingTop: '0px !important',
          paddingBottom: '0px !important',
          paddingLeft: '0px !important',
          height: '54px !important',
          [breakpoints.down(600)]: {
            height: '48px !important',
          },
        }),
        endAdornment: {
          right: '1rem !important',
        },
        clearIndicator: ({ theme: { palette } }) => ({
          visibility: 'visible',
          marginRight: '0.5rem',
          color: palette.input.placeholder,
        }),
        listbox: {
          width: '100%',
          maxHeight: '186px',
          padding: '0px',
          borderRadius: '8px',
        },
        option: ({ theme: { palette } }) => ({
          minHeight: '44px !important',
          ':hover': {
            backgroundColor: `${palette.primary.main} !important`,
            color: `${palette.common.white} !important`,
          },
        }),
        paper: ({ theme: { palette } }) => ({
          marginTop: '8px',
          marginBottom: '8px',
          boxShadow: `0px 4px 10px ${palette.card.boxShadow}`,
          borderRadius: '8px',
        }),
        noOptions: {
          // fontSize: defaultFontSize,
          // color: appColors.yankeesBlue,
        },
        loading: {
          // fontSize: defaultFontSize,
          // color: appColors.yankeesBlue,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '8px !important',
          padding: '16px 24px',
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          borderRadius: '8px !important',
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: ({ ownerState, theme: { palette } }) => ({
          '& .Mui-selected': {
            color: `${palette.common.white} !important`,
          },
          '& .MuiSvgIcon-root': {
            color: `${palette.primary.main} !important`,
          },
        }),
      },
    },
    MuiMultiSectionDigitalClock: {
      styleOverrides: {
        root: ({ ownerState, theme: { palette } }) => ({
          '& .Mui-selected': {
            color: `${palette.common.white} !important`,
          },
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ ownerState, theme: { palette, breakpoints } }) => ({
          padding: '24px 20px',
          borderRadius: '10px !important',
          boxSizing: 'border-box',
          fontFamily: poppins.style.fontFamily,
          boxShadow: 'none',
          [breakpoints.down(600)]: {
            padding: '20px 16px',
          },
        }),
        expanded: ({ ownerState, theme: { palette, breakpoints } }) => ({
          minHeight: 0,
          margin: 0,
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ ownerState, theme: { palette, breakpoints } }) => ({
          padding: 0,
          height: 'auto !important',
          minHeight: 'auto !important',
          boxSizing: 'border-box',
          fontFamily: poppins.style.fontFamily,
        }),
        content: ({ ownerState, theme: { palette, breakpoints } }) => ({
          margin: '0px !important',
        }),
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ ownerState, theme: { palette, breakpoints } }) => ({
          paddingLeft: 0,
          paddingTop: '16px',
          paddingRight: '48px',
          paddingBottom: 0,
          boxSizing: 'border-box',
          fontFamily: poppins.style.fontFamily,
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme: { palette } }) => ({
          marginTop: '8px',
          padding: '0px',
          boxShadow: `0px 4px 10px ${palette.card.boxShadow}`,
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
