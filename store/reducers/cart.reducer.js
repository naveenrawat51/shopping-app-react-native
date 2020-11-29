import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.action";
import { ADD_ORDER } from "../actions/orders.action";

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

    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.productId];
      const itemQuantity = selectedItem.quantity;
      let updatedCartItems;

      if (itemQuantity > 1) {
        const updatedCartItem = {
          ...selectedItem,
          quantity: selectedItem.quantity - 1,
          sum: selectedItem.sum - selectedItem.price,
        };
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.price,
      };

    case ADD_ORDER:
      return initialState;
  }
  return state;
}
