import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1.2rem',
    marginLeft: '2rem',
  },
}));

const ProductDetails = (props) => {
  const styles = useStyles();
  const { shopifyProduct } = props;

  return (
    <Box className={styles.details}>
      <Typography>{shopifyProduct.title}</Typography>
      <Typography>{shopifyProduct.description}</Typography>
      <Typography>
        Price: {shopifyProduct.priceRangeV2.maxVariantPrice.amount}{' '}
        {shopifyProduct.priceRangeV2.maxVariantPrice.currencyCode}
      </Typography>
      <TextField
        variant="filled"
        id="amount"
        label="amount"
        type="number"
        value={props.amount}
        onChange={props.changeAmount}
      />
      {shopifyProduct.variants.length > 1 && (
        <TextField
          select
          id="variant"
          label="Variant"
          type="text"
          value={props.variant}
          helperText="Please select a product variant"
          onChange={props.changeVariant}
        >
          {shopifyProduct.variants.map((variant) => (
            <MenuItem key={variant.sku} value={variant.title}>
              {variant.title}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Button variant="contained" color="primary" onClick={props.addProduct}>
        Add to cart
      </Button>
    </Box>
  );
};

export default ProductDetails;
