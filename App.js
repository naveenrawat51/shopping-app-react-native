import React, { useState } from "react";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import ProductReducer from "./store/reducers/products.reducer";
import CartReducer from "./store/reducers/cart.reducer";
import OrdersReducer from "./store/reducers/orders.reducer";

import ShopNavigator from "./navigation/ShopNavigator";

const fetchFonts = (_) => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
