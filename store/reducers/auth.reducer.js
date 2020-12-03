import { AUTHENTICATE, LOGOUT } from "../actions/auth.action";
import { AsyncStorage } from "react-native";
const initalState = {
  token: null,
  userId: null,
};

export default function AuthReducer(state = initalState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      AsyncStorage.removeItem("userData");
      return initalState;
  }

  return state;
}
