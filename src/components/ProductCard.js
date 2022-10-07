import React from 'react';
import { navigate } from 'gatsby';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { GatsbyImage } from 'gatsby-plugin-image';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  imgContainer: {
    maxHeight: '400px',
  },
  img: {
    objectFit: 'contain',
  },
}));

const ProductCard = (props) => {
  const styles = useStyles();
  return (
    <Card>
      <CardContent
        className={styles.content}
        onClick={() => navigate(`${props.handle}`)}
      >
        <GatsbyImage
          className={styles.imgContainer}
          imgStyle={styles.img}
          image={props.image}
          alt={props.alt}
        />
        <Typography>{props.title}</Typography>
        <Typography>Price: {props.price}{props.currency}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained">
          <AddShoppingCart/>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
