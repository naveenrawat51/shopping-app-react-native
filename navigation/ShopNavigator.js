import React from "react";
import { useDispatch } from "react-redux";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  AsyncStorage,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { logout } from "../store/actions/auth.action";

import ProductOverviewScreen from "../screens/shop/ProductOverview.screen";
import ProductDetailScreen from "../screens/shop/ProductDetails.screen";
import CartScreen from "../screens/shop/Cart.screen";
import OrdersScreen from "../screens/user/Orders.screen";
import UserProducts from "../screens/user/UserProducts.screen";
import EditProductsScreen from "../screens/user/EditProducts.screen";
import AuthScreen from "../screens/user/Auth.screen";
import StartupScreen from "../screens/Startup.screen";

const defaultNavOption = {
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
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOvreview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-card" : "ios-card"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOption,
  }
);

const OrderNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOption,
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProducts,
    EditProducts: EditProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOption,
  }
);

const ShoppingNavigator = createDrawerNavigator(
  {
    Products: ProductNavigator,
    Orders: OrderNavigator,
    Admin: UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();

      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
                AsyncStorage.removeItem("userData");
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOption,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShoppingNavigator,
});

export default createAppContainer(MainNavigator);
