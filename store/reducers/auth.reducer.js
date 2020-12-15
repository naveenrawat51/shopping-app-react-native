import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth.action";
import { AsyncStorage } from "react-native";
const initalState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default function AuthReducer(state = initalState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      AsyncStorage.removeItem("userData");
      return {
        ...initalState,
        didTryAutoLogin: true,
      };
  }

  return state;
}
