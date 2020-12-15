import React from "react";
import { useDispatch } from "react-redux";
import { Platform, SafeAreaView, Button, View } from "react-native";
// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import {
//   createDrawerNavigator,
//   DrawerNavigatorItems,
// } from "react-navigation-drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { logout } from "../store/actions/auth.action";

import ProductOverviewScreen, {
  productOverviewScreenOptions,
} from "../screens/shop/ProductOverview.screen";
import ProductDetailScreen, {
  ProductDetailOptions,
} from "../screens/shop/ProductDetails.screen";
import CartScreen, { CartScreenOptions } from "../screens/shop/Cart.screen";
import OrdersScreen, {
  OrdersScreenOptions,
} from "../screens/user/Orders.screen";
import UserProducts, {
  UserProductsOptions,
} from "../screens/user/UserProducts.screen";
import EditProductsScreen, {
  EditProductsOptions,
} from "../screens/user/EditProducts.screen";
import AuthScreen, { AuthScreenOptions } from "../screens/user/Auth.screen";
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

const ProductStackNavigator = createStackNavigator();
export const ProductNavigator = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavOption}>
      <ProductStackNavigator.Screen
        name="ProductsOvreview"
        component={ProductOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailOptions}
      />
      <ProductStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={CartScreenOptions}
      />
    </ProductStackNavigator.Navigator>
  );
};

// const ProductNavigator = createStackNavigator(
//   {
//     ProductsOvreview: ProductOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-card" : "ios-card"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOption,
//   }
// );

const OrderStackNavigator = createStackNavigator();
export const OrderNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavOption}>
      <OrderStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={OrdersScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};
// const OrderNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOption,
//   }
// );
const UserProductsStackNavigator = createStackNavigator();
export const UserProductsNavigator = () => {
  return (
    <UserProductsStackNavigator.Navigator screenOptions={defaultNavOption}>
      <UserProductsStackNavigator.Screen
        name="UserProducts"
        component={UserProducts}
        options={UserProductsOptions}
      />
      <UserProductsStackNavigator.Screen
        name="EditProducts"
        component={EditProductsScreen}
        options={EditProductsOptions}
      />
    </UserProductsStackNavigator.Navigator>
  );
};
// const UserProductsNavigator = createStackNavigator(
//   {
//     UserProducts: UserProducts,
//     EditProducts: EditProductsScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOption
//   }
// );

const ShopingStackNavigator = createDrawerNavigator();
export const ShoppingNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopingStackNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      {/* <ShopingStackNavigator.Screen name="Products" component={ProductNavigator} /> */}
      <ShopingStackNavigator.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-card" : "ios-card"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopingStackNavigator.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopingStackNavigator.Screen
        name="Admin"
        component={UserProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopingStackNavigator.Navigator>
  );
};
// const ShoppingNavigator = createDrawerNavigator(
//   {
//     Products: ProductNavigator,
//     Orders: OrderNavigator,
//     Admin: UserProductsNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();

//       return (
//         <View style={{ flex: 1 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(logout());
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOption}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOption
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShoppingNavigator
// });

// export default createAppContainer(MainNavigator);
