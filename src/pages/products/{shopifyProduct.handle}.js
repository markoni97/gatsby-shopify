import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../../components/Layout';
import { CartContext } from '../../context/CartContext';
import { makeStyles, Box } from '@material-ui/core';
import ProductDetails from '../../components/product/ProductDetails';

const useStyles = makeStyles((theme) => ({
  product: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5rem 2rem',
  },
}));

const Product = ({ data }) => {
  const { shopifyProduct } = data;
  const [amount, setAmount] = useState(1);
  const [variant, setVariant] = useState(shopifyProduct.variants[0].title);
  const [variantId, setVariantId] = useState(
    shopifyProduct.variants[0].shopifyId
  );
  const [variantSku, setVariantSku] = useState(shopifyProduct.variants[0].sku);
  const cartContext = useContext(CartContext);
  const styles = useStyles();

  const findVariant = (variant) => {
    return shopifyProduct.variants.find((prod) => prod.title === variant);
  };

  const changeAmountHandler = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const changeVariantHandler = (e) => {
    setVariant(e.target.value);
    const prod = findVariant(e.target.value);
    setVariantId(prod.shopifyId);
    setVariantSku(prod.sku);
  };

  const addProductHandler = () => {
    const totalPrice =
      shopifyProduct.priceRangeV2.maxVariantPrice.amount * amount;

    const product = {
      id: variantId,
      name: shopifyProduct.title,
      variant: variant,
      price: shopifyProduct.priceRangeV2.maxVariantPrice.amount,
      quantity: amount,
      totalPrice: totalPrice,
      image:
        shopifyProduct.featuredImage.localFile.childImageSharp.gatsbyImageData,
      sku: variantSku,
    };
    console.log(product);
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
        <ProductDetails
          shopifyProduct={shopifyProduct}
          addProduct={addProductHandler}
          changeVariant={changeVariantHandler}
          changeAmount={changeAmountHandler}
          amount={amount}
          variant={variant}
        />
      </Box>
    </Layout>
  );
};

export default Product;
export const Head = ({ data }) => <title>{data.shopifyProduct.title}</title>;

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
        sku
        title
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