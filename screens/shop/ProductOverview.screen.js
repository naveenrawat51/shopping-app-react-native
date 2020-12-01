import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Platform,
  Button,
  View,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart.action";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { fetchProducts } from "../../store/actions/products.action";
import { isLoading } from "expo-font";

export default function ProductOverview({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prooducts = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const onSelectItemHandler = (id, title) =>
    navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchProducts())
      .then((_) => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [dispatch]);

  const displayItem = (itemData) => {
    return (
      <ProductItem
        {...itemData.item}
        onSelect={() =>
          onSelectItemHandler(itemData.item.id, itemData.item.title)
        }
      >
        <Button
          color={Colors.primary}
          title="view details"
          onPress={() =>
            onSelectItemHandler(itemData.item.id, itemData.item.title)
          }
        />
        <Button
          color={Colors.primary}
          title="add to cart"
          onPress={() => dispatch(CartActions.addToCart(itemData.item))}
        />
      </ProductItem>
    );
  };

  if (error) {
    return (
      <View style={styles.spinner}>
        <Text>An error occured!!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && prooducts.length === 0) {
    return (
      <View style={styles.spinner}>
        <Text>No Products founnd. May be start adding some!!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={prooducts}
      keyExtractor={(item) => item.id}
      renderItem={displayItem}
    />
  );
}

ProductOverview.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
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
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => navigation.navigate("Cart")}
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
