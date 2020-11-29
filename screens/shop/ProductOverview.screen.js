import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

export default function ProductOverview({ navigation }) {
  const prooducts = useSelector((state) => state.products.availableProducts);

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
        onAddCart={() => {}}
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
