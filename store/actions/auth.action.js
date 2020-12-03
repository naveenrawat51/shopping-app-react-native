import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token,
      userId,
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcOWy5sF7zUvrCR1Ug2wybrVKt200hZwY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      // you can use if else here to send customize message for every error
      const resData = await response.json();
      throw new Error(resData.error.message);
    }
    const resData = await response.json();
    const expirationDate = new Date().getTime() + 3600000;
    dispatch(authenticate(resData.idToken, resData.localId, expirationDate));
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcOWy5sF7zUvrCR1Ug2wybrVKt200hZwY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      // you can use if else here to send customize message for every error
      const resData = await response.json();
      throw new Error(resData.error.message);
    }

    const resData = await response.json();
    const expirationDate = new Date().getTime() + 3600000;

    dispatch(authenticate(resData.idToken, resData.localId, expirationDate));
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expiryTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expiryTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expirationDate,
    })
  );
};
