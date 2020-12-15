import React from "react";
import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { ShoppingNavigator, AuthNavigator } from "./ShopNavigator";

import StartupScreen from "../screens/Startup.screen";

export default function AppNavigator(props) {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShoppingNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
}
