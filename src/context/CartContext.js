import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  products: [],
  totalAmount: 0,
  totalQuantity: 0,
  addProduct: () => {},
  removeProduct: () => {},
});

//Product {id, name, price, quantity, totalPrice, image}

const CartProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addProduct = (product) => {
    setTotalQuantity((prevState) => {
      return prevState + product.quantity;
    });
    setTotalAmount((prevState) => {
      return prevState + product.price * product.quantity;
    });

    const productIndex = products.findIndex((prod) => prod.id === product.id);
    const existingProduct = products[productIndex];

    let productsCopy;
    if (existingProduct) {
      const productCopy = {
        ...existingProduct,
        quantity: existingProduct.quantity + product.quantity,
        totalPrice:
          existingProduct.totalPrice + product.price * product.quantity,
      };
      productsCopy = [...products];
      productsCopy[productIndex] = productCopy;
    } else {
      productsCopy = products.concat(product);
    }
    setProducts(productsCopy);
  };

  const removeProduct = (id) => {
    const productIndex = products.findIndex((prod) => prod.id === id);
    const existingProduct = products[productIndex];

    setTotalQuantity((prevState) => {
      return prevState - existingProduct.quantity;
    });

    setTotalAmount((prevState) => {
      return prevState - existingProduct.totalPrice;
    });

    const productsCopy = products.filter((prod) => prod.id !== id);
    setProducts(productsCopy);
  };

  const cartContext = {
    products,
    totalAmount,
    totalQuantity,
    addProduct,
    removeProduct,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
