import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { authenticate, setDidTryAl } from "../store/actions/auth.action";

export default function StartupScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        // navigation.navigate("Auth");
        dispatch(setDidTryAl());
        return;
      }
      const transformedData = JSON.parse(userData);

      const { token, userId, expirationDate } = transformedData;
      const expiryDate = new Date(expirationDate);
      if (expiryDate <= new Date() || !token || !userId) {
        // navigation.navigate("Auth");
        dispatch(setDidTryAl());
        return;
      }

      const expirationTime = expiryDate.getTime() - new Date().getTime();
      // navigation.navigate("ProductsOvreview");
      dispatch(authenticate(token, userId, expirationTime));
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
