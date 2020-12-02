export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
      throw new Error(response.message);
    }

    const resData = await response.json();

    console.log("sign up: ", resData);

    dispatch({
      type: SIGNUP,
    });
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
      throw new Error(response.message);
    }

    const resData = await response.json();

    console.log("logged in: ", resData);

    dispatch({
      type: LOGIN,
    });
  };
};
