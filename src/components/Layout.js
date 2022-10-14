import React from 'react';
import { createTheme, makeStyles, ThemeProvider, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Nav from './Nav';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6D28',
    },
    secondary: {
      main: '#FBCB0A',
    },
    custom: {
      main: '#f57c00',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: '6vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1024px',
    margin: '0 auto',
  },
}));

const Layout = (props) => {
  const styles = useStyles();

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Nav />
      <Box className={styles.main}>{props.children}</Box>
    </ThemeProvider>
  );
};

export default Layout;
