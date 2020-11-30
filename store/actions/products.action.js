export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

export const createProduct = (productData) => {
  return {
    type: CREATE_PRODUCT,
    ...productData,
  };
};

export const updateProduct = (productId, productData) => {
  return {
    type: UPDATE_PRODUCT,
    productId,
    ...productData,
  };
};
