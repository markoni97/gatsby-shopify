import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { CartContext } from '../../context/CartContext';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: '5rem'
  },
  image: {
    height: '8rem',
    width: '8rem',
  },
  purchaseBtn: {
    margin: '3rem 0'
  }
}));

const Cart = () => {
  const cartContext = useContext(CartContext);
  const styles = useStyles();

  const cartPurchaseHandler = () => {
    console.log(cartContext.products);
  };

  const products = cartContext.products.map((prod) => {
    return (
      <TableRow key={prod.id}>
        <TableCell>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => cartContext.removeProduct(prod.id)}
          >
            Remove
          </Button>
        </TableCell>
        <TableCell>
          <GatsbyImage
            className={styles.image}
            image={prod.image}
            alt="Product image"
          />
        </TableCell>
        <TableCell>{prod.name}</TableCell>
        <TableCell>{prod.price}$</TableCell>
        <TableCell>{prod.quantity}</TableCell>
        <TableCell>{prod.totalPrice}$</TableCell>
      </TableRow>
    );
  });

  return (
    <Layout>
      <TableContainer className={styles.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>PRODUCT</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>QUANTITY</TableCell>
              <TableCell>TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{products}</TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" className={styles.purchaseBtn} onClick={cartPurchaseHandler}>
        Purchase
      </Button>
    </Layout>
  );
};

export default Cart;
export const Head = () => <title>Cart</title>;
