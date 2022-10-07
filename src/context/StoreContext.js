import React, { createContext, useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

const storeContext = createContext({
  cart: [],
  loading: false,
  client: client,
  checkout: {
    id: '',
    items: [],
    webUrl: '',
  },
});

const isBrowser = typeof window != 'undefined';
const localStorageKey = 'shopify_checkout_id';
