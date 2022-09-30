require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        storeUrl: process.env.SHOPIFY_STORE_URL,
        downloadImages: true,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};
