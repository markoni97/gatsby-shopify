import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { AppBar, Box, Typography, Badge, makeStyles } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../context/CartContext';

const useStyles = makeStyles((theme) => ({
  navigation: {
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '6vh',
    backgroundColor: 'black',
  },
  link: {
    textDecoration: 'none',
    margin: '0 1.2rem',
    color: 'white',
    '&:hover': {
      color: 'silver',
    },
  },
}));

const Nav = () => {
  const cartContext = useContext(CartContext);
  const styles = useStyles();

  return (
    <AppBar className={styles.navigation}>
      <Box className={styles.navigation}>
        <Link to="/" className={styles.link}>
          <Typography variant="h4" color="primary">
            Tech Shop
          </Typography>
        </Link>
        <Link to="/products" className={styles.link}>
          <Typography>Products</Typography>
        </Link>
        <Link to="/blog" className={styles.link}>
          <Typography>My Blog</Typography>
        </Link>
      </Box>
      <Link to="/checkout" className={styles.link}>
        <Badge badgeContent={cartContext.totalQuantity} color="primary" overlap="circular">
          <ShoppingCart fontSize="large" />
        </Badge>
      </Link>
    </AppBar>
  );
};

export default Nav;
