import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { CartContext } from '../../context/CartContext';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: '5rem',
  },
  image: {
    height: '8rem',
    width: '8rem',
  },
  purchaseBtn: {
    margin: '3rem 0',
  },
}));

//Product {id, name, price, quantity, totalPrice, image}

const Cart = () => {
  const cartContext = useContext(CartContext);
  const styles = useStyles();

  const lineItems = cartContext.products.map((prod) => {
    return {
      originalUnitPrice: prod.price,
      quantity: prod.quantity,
      requiresShipping: true,
      sku: prod.sku,
      taxable: true,
      title: prod.name,
      variantId: prod.id,
      weight: {
        unit: 'GRAMS',
        value: 1.1,
      },
    };
  });

  const cartPurchaseHandler = async () => {
    const response = await fetch(
      'https://039128.myshopify.com/admin/api/2022-10/graphql.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token':
            process.env.GATSBY_SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: `mutation draftOrderCreate($input: DraftOrderInput!){
            draftOrderCreate(input: $input) {
              draftOrder {
                lineItems(first: 10) {
                  edges {
                    node {
                      product {
                        title
                      }
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }`,
          variables: {
            input: {
              email: 'marko.radenkovic@vegait.rs',
              lineItems: lineItems,
              localizationExtensions: [
                {
                  key: 'TAX_CREDENTIAL_BR',
                  value: '',
                },
              ],
              marketRegionCountryCode: 'AT',
              note: '',
              phone: '+431234567890',
              presentmentCurrencyCode: 'EUR',
              purchasingEntity: {
                customerId: 'gid://shopify/Customer/6431312806123',
              },
              shippingAddress: {
                address1: 'Kasernstraße',
                address2: '',
                city: 'Graz',
                company: '',
                countryCode: 'AT',
                firstName: 'Marko',
                lastName: 'Radenkovic',
                phone: '+381654284106',
                provinceCode: '',
                zip: '8010',
              },
              shippingLine: {
                price: '35',
                shippingRateHandle: '',
                title: 'FedEx',
              },
              taxExempt: true,
              useCustomerDefaultAddress: true,
              visibleToCustomer: true,
            },
          },
        }),
      }
    );
    const data = await response.json();
  };

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
          <GatsbyImage
            className={styles.image}
            image={prod.image}
            alt="Product image"
          />
        </TableCell>
        <TableCell>
          {prod.name} | {prod.variant}
        </TableCell>
        <TableCell>{prod.price}$</TableCell>
        <TableCell>{prod.quantity}</TableCell>
        <TableCell>{prod.totalPrice}$</TableCell>
      </TableRow>
    );
  });

  return (
    <Layout>
      <TableContainer className={styles.table} component={Paper}>
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
      <Button
        variant="contained"
        color="primary"
        className={styles.purchaseBtn}
        onClick={cartPurchaseHandler}
      >
        Purchase
      </Button>
    </Layout>
  );
};

export default Cart;
export const Head = () => <title>Cart</title>;
