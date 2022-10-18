import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ProductCard from '../../components/ProductCard';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: '2rem 0',
  },
}));

const ProductPage = ({ data }) => {
  const styles = useStyles();

  const products = data.allShopifyProduct.edges.map((prod) => {
    return (
      <Grid item xs={5} key={prod.node.handle}>
        <ProductCard
          image={
            prod.node.featuredImage.localFile.childImageSharp.gatsbyImageData
          }
          alt={prod.node.title}
          title={prod.node.title}
          price={prod.node.priceRangeV2.maxVariantPrice.amount}
          currency={prod.node.priceRangeV2.maxVariantPrice.currencyCode}
          handle={prod.node.handle}
          sku={prod.node.variants[0].sku}
          id={prod.node.variants[0].shopifyId}
          variant={prod.node.variants[0].title}
        />
      </Grid>
    );
  });

  return (
    <Layout>
      <Typography variant="h4" component="h2" className={styles.header}>
        Our products
      </Typography>
      <Grid spacing={2} container justifyContent="center" alignContent="center">
        {products}
      </Grid>
    </Layout>
  );
};

export default ProductPage;
export const Head = () => <title>Products</title>;

export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          title
          handle
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants {
            shopifyId
            sku
            title
          }
          featuredImage {
            altText
            src
            localFile {
              childImageSharp {
                gatsbyImageData(height: 400)
              }
            }
          }
        }
      }
    }
  }
`;
