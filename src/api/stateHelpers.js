// Helper functions to manage global state via the reducer.
// This helps make the core component code more readable as
// the function name can be quickly interpreted rather than being
// bombarded with a complex dispatch invocation. 

import jwt_decode from "jwt-decode";
import { deleteTokenFromStorage } from "./storageHelpers";

export function setUserProps(dispatch, token = null) {
  let [id, email, profileComplete, stripeCustomer, role] = [null, null, null, null, null];

  try {
    if (token) ({ id, email, profileComplete, stripeCustomer, role } = jwt_decode(token));
    dispatch({
      type: "setUserProps",
      data: { id, email, profileComplete, stripeCustomer, role, token },
    });
  } catch (e) {
    console.error("Session token could not be decoded. What are you trying to do?");
    clearUserProps(dispatch);
    deleteTokenFromStorage();
  }
}

export function clearUserProps(dispatch) {
  dispatch({
    type: "setUserProps",
    data: {
      id: null,
      email: null,
      profileComplete: null,
      stripeCustomer: null,
      role: null,
      token: null,
    },
  });
}

export function setResetToken(dispatch, resetToken) {
  dispatch({
    type: "setResetToken",
    data: resetToken,
  });
}

export function clearResetToken(dispatch) {
  dispatch({
    type: "setResetToken",
    data: null,
  });
}

export function setRedirectURL(dispatch, url) {
  dispatch({ type: "setRedirectURL", data: url });
}

export function resetOnboardingStep(dispatch) {
  dispatch({ type: "resetOnboardingStep" });
}

export function setCheckInName(dispatch, name) {
  dispatch({ type: "setCheckInName", data: name });
}
