import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import { CartContext } from '../../context/CartContext';
import { Button, Snackbar, makeStyles } from '@material-ui/core';
import CheckoutTableRow from '../../components/table/CheckoutTableRow';
import CheckoutTable from '../../components/table/CheckoutTable';
import { createOrder } from '../../util/FetchRequests';

const useStyles = makeStyles((theme) => ({
  purchaseBtn: {
    margin: '3rem 0',
  },
}));

const Cart = () => {
  const cartContext = useContext(CartContext);
  const [submitting, setSubmiting] = useState({ message: '', open: false }); //success, error
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
    const response = await createOrder(lineItems);
    if (!response.ok) {
      setSubmiting({ message: 'Failed to make an order!', open: true });
      return;
    }
    const data = await response.json();
    setSubmiting({ message: 'Successfully made an order!', open: true });
    console.log(data);
  };

  const products = cartContext.products.map((prod) => {
    return (
      <CheckoutTableRow
        key={prod.sku}
        id={prod.id}
        name={prod.name}
        price={prod.price}
        quantity={prod.quantity}
        totalPrice={prod.totalPrice}
        variant={prod.variant}
        image={prod.image}
        onClick={() => cartContext.removeProduct(prod.id)}
      />
    );
  });

  return (
    <Layout>
      <CheckoutTable
        headings={[
          { title: '', span: 2 },
          { title: 'PRODUCT', span: 1 },
          { title: 'PRICE', span: 1 },
          { title: 'QUANTITY', span: 1 },
          { title: 'TOTAL', span: 1 },
        ]}
      >
        {products}
      </CheckoutTable>
      <Snackbar
        open={submitting.open}
        autoHideDuration={3000}
        message={submitting.message}
        onClose={() => setSubmiting({message: '', open: false})}
      />
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
