import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { CartContext } from '../../context/CartContext';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const Cart = () => {
  const cartContext = useContext(CartContext);
  console.log(cartContext.products);

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
          <GatsbyImage image={prod.image} alt="Product image" />
        </TableCell>
        <TableCell>{prod.title}</TableCell>
        <TableCell>{prod.price}$</TableCell>
        <TableCell>{prod.quantity}</TableCell>
        <TableCell>{prod.totalPrice}$</TableCell>
      </TableRow>
    );
  });

  return (
    <Layout>
      <TableContainer component={Paper}>
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
    </Layout>
  );
};

export default Cart;

export const Head = () => <title>Cart</title>;
