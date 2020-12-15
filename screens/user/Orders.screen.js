import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/orders.action";
import Colors from "../../constants/Colors";

export default function OrdersScreen({ navigation }) {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", () =>
      dispatch(fetchOrders())
    );

    return () => {
      willFocusSub.remove();
    };
  }, [fetchOrders]);

  useEffect(() => {
    isLoading(true);
    dispatch(fetchOrders())
      .then((data) => isLoading(false))
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <OrderItem {...itemData.item} />}
    />
  );
}

export const OrdersScreenOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
