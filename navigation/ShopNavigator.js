import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverview.screen";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetails.screen";
import CartScreen from "../screens/shop/Cart.screen";

const ShopNavigator = createStackNavigator(
  {
    ProductsOvreview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
