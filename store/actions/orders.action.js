import Order from "../../modals/orders.modal";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-shopping-app-96775.firebaseio.com/orders/u1.json"
      );
      const resData = await response.json();

      let loadedOrders = [];
      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export function addOrder(cartItems, totalAmount) {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      `https://rn-shopping-app-96775.firebaseio.com/orders/u1.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
}
