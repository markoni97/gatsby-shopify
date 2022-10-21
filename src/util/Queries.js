export const getAllProducts = `
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
