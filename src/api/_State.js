import jwt_decode from "jwt-decode";
import { deleteTokenFromStorage } from "./_Storage";

export function setUserProps(dispatch, token = null) {
  let [ id, email, profileComplete, subscribed, role ] = [null, null, null, null, null]

  try {
    if (token) ({ id, email, profileComplete, subscribed, role } = jwt_decode(token));
    dispatch({ type: "setUserProps", data: { id, email, profileComplete, subscribed, role, token } });
  } catch (e) {
    console.error("Session token could not be decoded. What are you trying to do?")
    clearUserProps(dispatch)
    deleteTokenFromStorage()
  }
}

export function clearUserProps(dispatch) {
  dispatch({
    type: "setUserProps",
    data: { id: null, email: null, profileComplete: null, subscribed: null, role: null, token: null },
  });
}

export function setResetToken(dispatch, resetToken) {
  dispatch({
    type: "setResetToken",
    data: resetToken
  })
}

export function clearResetToken(dispatch) {
  dispatch({
    type: "setResetToken",
    data: null
  })
}
