import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products.action";

export default function UserProducts({ navigation }) {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const editProductHandler = (id) => {
    navigation.navigate({
      routeName: "EditProducts",
      params: {
        productId: id,
      },
    });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          {...itemData.item}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() =>
              dispatch(productsActions.deleteProduct(itemData.item.id))
            }
          />
        </ProductItem>
      )}
    />
  );
}

UserProducts.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "My Products",
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
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => navigation.navigate("EditProducts")}
          />
        </HeaderButtons>
      );
    },
  };
};
