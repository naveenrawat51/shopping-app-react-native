import { AUTO_LOGIN, LOGOUT } from "../actions/auth.action";

const initalState = {
  token: null,
  userId: null,
};

export default function AuthReducer(state = initalState, action) {
  switch (action.type) {
    case AUTO_LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initalState;
  }

  return state;
}
