import React, { useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../store/actions/auth.action";

const REDUCER_SIGNUP = "REDUCER_SIGNUP";
const REDUCER_INPUT_BLUR = "REDUCER_INPUT_BLUR";

const formReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_SIGNUP:
      const AnyTouchedField = action.input + "Touched";
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
        [AnyTouchedField]: action.value.trim().length === 0 ? false : true,
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

    case REDUCER_INPUT_BLUR:
      const touchedField = action.inputIdentifier + "Touched";
      const updatedTouchedValidities = {
        ...state.inputValidities,
        [touchedField]:
          state.inputValues[action.inputIdentifier].trim().length > 0
            ? true
            : false,
      };
      let isFormValidTouched = true;
      for (const key in updatedTouchedValidities) {
        isFormValidTouched =
          isFormValidTouched && updatedTouchedValidities[key];
      }
      return {
        ...state,
        inputValidities: updatedTouchedValidities,
        isFormValid: isFormValidTouched,
      };
  }

  return state;
};

export default function AuthScreen() {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      emailTouched: true,
      password: false,
      passwordTouched: true,
    },
    isFormValid: false,
  });

  const authHandler = () => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong Inputs!!", "Please enter valid Credentials", [
        { text: "Okay!!" },
      ]);
      return;
    }
    let action;
    if (isSignUp) {
      action = AuthActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = AuthActions.logIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    dispatch(action);
  };

  const textChangeHandler = (text, inputIdentifier) => {
    let isValid = text.length > 0 ? true : false;
    dispatchFormState({
      type: REDUCER_SIGNUP,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  const onblurHandler = (inputIdentifier) => {
    dispatchFormState({
      type: REDUCER_INPUT_BLUR,
      inputIdentifier,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <View style={styles.AuthContainer}>
          <ScrollView>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                onChangeText={(text) => textChangeHandler(text, "email")}
                onBlur={() => onblurHandler("email")}
              />
              {!formState.inputValidities.emailTouched && (
                <Text style={{ color: "red" }}>Enter valid email</Text>
              )}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => textChangeHandler(text, "password")}
                onBlur={() => onblurHandler("password")}
              />
              {!formState.inputValidities.passwordTouched && (
                <Text style={{ color: "red" }}>Enter valid Password</Text>
              )}
            </View>
            <View style={styles.action}>
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                color={Colors.primary}
                onPress={() => setIsSignUp((prevState) => !prevState)}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

AuthScreen.navigationOptions = {
  headerTitle: "Login",
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  AuthContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
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
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    flexDirection: "column",
    marginTop: 10,
  },
});
