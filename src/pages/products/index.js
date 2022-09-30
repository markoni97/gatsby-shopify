import React from 'react';
import { graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const ProductPage = ({ data }) => {
  const products = data.allShopifyProduct.nodes.map((prod) => {
    return (
      <div key={prod.handle}>
        <StaticImage src={prod.featuredImage.src} alt={prod.title}/>
        <h2>{prod.title}</h2>
        <p>{prod.description}</p>
      </div>
    );
  });

  console.log(data.allShopifyProduct.nodes[0]);

  return (
    <div>
      <h1>Product Page</h1>
      {products}
    </div>
  );
};

export default ProductPage;

export const Head = () => <title>Product Page</title>;

export const query = graphql`
  {
    allShopifyProduct {
      nodes {
        title
        handle
        variants {
          shopifyId
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
          }
        }
        description
        featuredImage {
          src
        }
      }
    }
  }
`;
