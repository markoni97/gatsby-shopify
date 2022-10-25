export const createOrder = async (lineItems) => {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lineItems }),
  });
  return response;
};
