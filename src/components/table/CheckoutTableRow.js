import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { TableRow, TableCell, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: '7rem',
    width: '7rem'
  },
  image: {
    objectFit: 'contain !important'
  },
}));

const CheckoutTableRow = (props) => {
  const styles = useStyles();

  return (
    <TableRow>
      <TableCell align="center">
        <Button variant="contained" color="secondary" onClick={props.onClick}>
          Remove
        </Button>
      </TableCell>
      <TableCell align="center">
        <GatsbyImage
          imgClassName={styles.image}
          className={styles.imageContainer}
          image={props.image}
          alt="Product image"
        />
      </TableCell>
      <TableCell align="center">
        {props.name} | {props.variant}
      </TableCell>
      <TableCell align="center">{props.price}$</TableCell>
      <TableCell align="center">{props.quantity}</TableCell>
      <TableCell align="center">{props.totalPrice}$</TableCell>
    </TableRow>
  );
};

export default CheckoutTableRow;
