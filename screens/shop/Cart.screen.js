import React from "react";
import { StyleSheet, FlatList, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as CartActions from "../../store/actions/cart.action";
import * as orderActions from "../../store/actions/orders.action";

export default function CartScreen() {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        ...state.cart.items[key],
      });
    }

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText} numberOfLines={1}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, totalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(dataItem) => (
          <CartItem
            {...dataItem.item}
            deletable={true}
            onRemove={() =>
              dispatch(CartActions.removeFromCart(dataItem.item.productId))
            }
          />
        )}
      />
    </View>
  );
}

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
