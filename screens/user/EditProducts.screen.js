import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products.action";

export default function EditProducts({ navigation }) {
  const ProductId = navigation.getParam("productId");
  const EditedProduct = ProductId
    ? useSelector((state) =>
        state.products.userProducts.find((product) => product.id === ProductId)
      )
    : null;

  const dispatch = useDispatch();

  const [title, setTitle] = useState(EditedProduct ? EditedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    EditedProduct ? EditedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    EditedProduct ? EditedProduct.description : ""
  );

  const submitHandler = () => {
    EditedProduct
      ? dispatch(
          productActions.updateProduct(ProductId, {
            title,
            imageUrl,
            description,
          })
        )
      : dispatch(
          productActions.createProduct({ title, imageUrl, description, price })
        );

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [title, imageUrl, price, description]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {EditedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

EditProducts.navigationOptions = ({ navigation }) => {
  const submitForm = navigation.getParam("submit");

  return {
    headerTitle: navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitForm}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
