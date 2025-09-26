import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff8a00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0e0e0e',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      textTransform: 'uppercase',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 700,
      textTransform: 'uppercase',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h4: {
      fontSize: '18px',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: '16px',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 2.8,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;