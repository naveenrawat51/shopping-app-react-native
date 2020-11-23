import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverview.screen";
import Colors from "../constants/Colors";

const ShopNavigator = createStackNavigator(
  {
    ProductsOvreview: ProductOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
