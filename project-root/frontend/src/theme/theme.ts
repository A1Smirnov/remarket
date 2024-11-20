// frontend/src/theme/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a74da', // Nav and footer color (dark blue)
    },
    secondary: {
      main: '#ff7043', // Secondary color (eg Buttons)
    },
    background: {
      default: '#f4f6f8', // Main background (color)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
