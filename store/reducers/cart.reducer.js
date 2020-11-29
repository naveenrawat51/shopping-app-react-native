import { ADD_TO_CART } from "../actions/cart.action";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.product;
      let updatedOrNewCartItem;

      updatedOrNewCartItem = state.items[id]
        ? {
            quantity: state.items[id].quantity + 1,
            price,
            title,
            sum: state.items[id].sum + price,
          }
        : { quantity: 1, price, title, sum: price };

      return {
        ...state,
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + price,
      };
  }
  return state;
}
