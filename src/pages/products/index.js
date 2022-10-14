import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import { Grid, Typography } from '@material-ui/core';
import ProductCard from '../../components/ProductCard';

const ProductPage = ({ data }) => {

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
        />
      </Grid>
    );
  });

  return (
    <Layout>
      <Typography variant='h4' component='h2'>Our products</Typography>
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
