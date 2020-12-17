import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products.action";

const REDUCER_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === REDUCER_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let isFormValid = true;
    for (const key in updatedValidities) {
      isFormValid = isFormValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      isFormValid,
    };
  }

  return state;
};

export default function EditProducts({ route, navigation }) {
  const userId = useSelector((state) => state.auth.userId);
  const ProductId = route.params ? route.params.productId : null;
  const EditedProduct = ProductId
    ? useSelector((state) =>
        state.products.userProducts.find((product) => product.id === ProductId)
      )
    : null;

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: EditedProduct ? EditedProduct.title : "",
      imageUrl: EditedProduct ? EditedProduct.imageUrl : "",
      description: EditedProduct ? EditedProduct.description : "",
      price: null,
    },
    inputValidities: {
      title: EditedProduct ? true : false,
      imageUrl: EditedProduct ? true : false,
      description: EditedProduct ? true : false,
      price: EditedProduct ? true : false,
    },
    isFormValid: EditedProduct ? true : false,
  });

  const submitHandler = () => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong Inputs!!", "Please enter item details Correctly", [
        { text: "Okay!!" },
      ]);
      return;
    }

    EditedProduct
      ? dispatch(
          productActions.updateProduct(ProductId, {
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
          })
        )
      : dispatch(
          productActions.createProduct({
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            ownerId: userId,
            description: formState.inputValues.description,
            price: formState.inputValues.price,
          })
        );

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
              }
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [
    formState.inputValues.title,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
    formState.inputValues.description,
    formState.isFormValid,
  ]);

  const textChangeHandler = (text, inputIdentifier) => {
    let isValid = text.length > 0 ? true : false;
    dispatchFormState({
      type: REDUCER_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler(text, "title")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler(text, "imageUrl")}
            returnKeyType="next"
            onSubmitEditing={() =>
              console.log("onSubmitEditing done for image url")
            }
          />
        </View>
        {EditedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => textChangeHandler(text, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler(text, "description")}
            multiline
            numberOfLines={3}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export const EditProductsOptions = ({ route }) => {
  // const submitForm = route.params ? route.params.submit  :  null;
  const routeParams = route.params ? route.params : {};
  return {
    headerTitle: routeParams.productId ? "Edit Product" : "Add Product",
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
