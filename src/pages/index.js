import * as React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/Layout';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background:
      'url(https://cdn.shopify.com/s/files/1/0667/1935/1019/files/hero-image.jpg?v=1665133021)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(40%)',
  }, 
  heroContent: {
    position: 'relative',
    width: '100vw',
    height: '94vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  button: {
    marginTop: '2rem',
  },
}));

const IndexPage = () => {
  const styles = useStyles();

  return (
    <Layout>
      <Box className={styles.hero}></Box>
      <Box className={styles.heroContent}>
        <Typography variant="h1" component="h1">
          Tech Shop
        </Typography>
        <Typography variant="h6" component="h2">
          Explore our products
        </Typography>
        <Button
          variant="outlined"
          size="large"
          className={styles.button}
          color="primary"
          onClick={() => navigate('/products')}
        >
          Shop All
        </Button>
      </Box>
    </Layout>
  );
};

export default IndexPage;
export const Head = () => <title>My Store</title>;