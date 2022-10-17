import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../../components/Layout';
import { CartContext } from '../../context/CartContext';
import {
  makeStyles,
  Box,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  product: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5rem 2rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1.2rem',
    marginLeft: '2rem',
  },
}));

const Product = ({ data }) => {
  const { shopifyProduct } = data;
  const [amount, setAmount] = useState(1);
  const cartContext = useContext(CartContext);
  const styles = useStyles();

  const changeAmountHandler = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const addProductHandler = () => {
    const totalPrice =
      shopifyProduct.priceRangeV2.maxVariantPrice.amount * amount;

    const product = {
      id: shopifyProduct.handle,
      name: shopifyProduct.title,
      price: shopifyProduct.priceRangeV2.maxVariantPrice.amount,
      quantity: amount,
      totalPrice: totalPrice,
      image:
        shopifyProduct.featuredImage.localFile.childImageSharp.gatsbyImageData,
    };
    cartContext.addProduct(product);
  };

  return (
    <Layout>
      <Box className={styles.product}>
        <GatsbyImage
          image={
            shopifyProduct.featuredImage.localFile.childImageSharp
              .gatsbyImageData
          }
          alt={shopifyProduct.featuredImage.altText}
        />
        <Box className={styles.details}>
          <Typography>{shopifyProduct.title}</Typography>
          <Typography>{shopifyProduct.description}</Typography>
          <Typography>
            Price:{' '}
            {shopifyProduct.priceRangeV2.maxVariantPrice.amount.toLocaleString(
              'sr-RS'
            )}{' '}
            {shopifyProduct.priceRangeV2.maxVariantPrice.currencyCode}
          </Typography>
          <TextField
            variant="filled"
            id="amount"
            label="amount"
            type="number"
            value={amount}
            onChange={changeAmountHandler}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addProductHandler}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query ($handle: String) {
    shopifyProduct(handle: { eq: $handle }) {
      title
      description
      handle
      totalInventory
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants {
        shopifyId
        price
        availableForSale
      }
      featuredImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export default Product;
export const Head = ({ data }) => <title>{data.shopifyProduct.title}</title>;
