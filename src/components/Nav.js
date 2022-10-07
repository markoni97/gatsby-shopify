import React from 'react';
import { Link } from 'gatsby';
import { AppBar, Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem'
  },
  link: {
    textDecoration: 'none',
    margin: '0 1rem',
    color: 'white',
    "&:hover": {
      color: 'silver'
    }
  },
  active: {
    color: '#37E2D5'
  }
}));

const Nav = () => {
  const styles = useStyles();

  return (
    <AppBar color='primary'>
      <Box className={styles.navigation}>
        <Link to="/" className={styles.link}>
          <Typography>HOME</Typography>
        </Link>
        <Link to="/products" className={styles.link}>
          <Typography>PRODUCTS</Typography>
        </Link>
        <Link to="/blog" className={styles.link}>
          <Typography>BLOG</Typography>
        </Link>
      </Box>
    </AppBar>
  );
};

export default Nav;
