import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

export default function ProductOverview(props) {
  const prooducts = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={prooducts}
      keyExtractor={(item) => item.id}
      renderItem={(itenData) => <Text>{itenData.item.title}</Text>}
    />
  );
}
