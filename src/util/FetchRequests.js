export const createOrder = async (lineItems) => {
  const response = await fetch(
    'https://039128.myshopify.com/admin/api/2022-10/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.GATSBY_SHOPIFY_ADMIN_ACCESS_TOKEN,
        'Access-Control-Allow-Origin': 'https://039128.myshopify.com/admin/api/2022-10/graphql.json',
        'Access-Control-Allow-Credentials': true
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
  return response;
};
