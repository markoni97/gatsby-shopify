import React from 'react';
import { createTheme, ThemeProvider, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Nav from './Nav';

const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#570A57',
    },
    secondary: {
      main: '#5800FF',
    },
    custom: {
      main: 'white',
    },
  },
});

const Layout = (props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
      <Box
        sx={{
          paddingTop: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '1024px',
          margin: '0 auto',
        }}
      >
        {props.children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
