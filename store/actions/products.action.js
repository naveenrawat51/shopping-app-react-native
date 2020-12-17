import Product from "../../modals/product.modal";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-shopping-app-96775.firebaseio.com/products.json"
      );
      const resData = await response.json();

      let loadedProducts = [];
      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            +resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-shopping-app-96775.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  };
};

export const createProduct = (productData) => {
  return async (dispatch) => {
    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== "granted") {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      productData.ownerPushToken = pushToken;
    }

    const response = await fetch(
      "https://rn-shopping-app-96775.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.error.message);
    }
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      ...productData,
      id: resData.name,
    });
  };
};

export const updateProduct = (productId, productData) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shopping-app-96775.firebaseio.com/products/${productId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          alg: "RS256",
          kid: "tB0M2A",
          iat: "1606968415",
        },
        body: JSON.stringify(productData),
      }
    );

    const resData = await response.json();

    dispatch({
      type: UPDATE_PRODUCT,
      productId,
      ...productData,
    });
  };
};
