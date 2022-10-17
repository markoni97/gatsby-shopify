import React, { useContext } from 'react';
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
import { CartContext } from '../context/CartContext';

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
  const cartContext = useContext(CartContext);
  const styles = useStyles();

  const addProductHandler = () => {
    const product = {
      id: props.handle,
      name: props.title,
      price: props.price,
      quantity: 1,
      totalPrice: props.price,
      image: props.image,
    };
    cartContext.addProduct(product);
  };

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
        <Typography>
          Price: {props.price}
          {props.currency}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={addProductHandler}>
          <AddShoppingCart />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
