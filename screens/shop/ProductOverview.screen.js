import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart.action";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

export default function ProductOverview({ navigation }) {
  const prooducts = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const displayItem = (itemData) => {
    return (
      <ProductItem
        {...itemData.item}
        onViewDetail={() =>
          navigation.navigate({
            routeName: "ProductDetail",
            params: {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            },
          })
        }
        onAddToCart={() => dispatch(CartActions.addToCart(itemData.item))}
      />
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
