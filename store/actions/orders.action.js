export const ADD_ORDER = "ADD_ORDER";

export function addOrder(cartItems, totalAmount) {
  return {
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount,
    },
  };
}
