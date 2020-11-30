import PRODUCTS from "../../data/Products.data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products.action";
import Product from "../../modals/product.modal";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString,
        "u1",
        action.title,
        action.imageUrl,
        action.description,
        action.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.productId
      );
      const availaleProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );

      const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIndex].ownerId,
        action.title,
        action.imageUrl,
        action.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const availaleUserProducts = [...state.availableProducts];
      availaleUserProducts[availaleProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: availaleUserProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
  }
  return state;
};
