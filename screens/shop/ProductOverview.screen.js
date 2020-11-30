import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart.action";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

export default function ProductOverview({ navigation }) {
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
