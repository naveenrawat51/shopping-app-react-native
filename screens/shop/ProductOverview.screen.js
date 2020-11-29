import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart.action";

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

ProductOverview.navigationOptions = {
  headerTitle: "All Products",
};
