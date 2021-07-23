import axios from "axios";
import { displayNotification } from "../components/_Notification";
import { retrieveTokenFromStorage, saveTokenToStorage, deleteTokenFromStorage } from "./_Storage";
import { clearProfileComplete, clearRole, clearToken, setProfileComplete, setRole, setToken } from "./_State";

const API_URL = process.env.REACT_APP_API_URL;

export function signUp(dispatch, email, password) {
  const signUpURL = `${API_URL}/users`;

  axios
    .post(signUpURL, { user: { email, password } })
    .then((resp) => {
      const token = resp.headers.authorization;
      return saveTokenToStorage(token);
    })
    .then((token) => {
      dispatch({ type: "setToken", data: token });
    })
    .then((_) => {
      displayNotification(
        dispatch,
        3000,
        "success",
        "Welcome!",
        "Your account was successfully created."
      );
    })
    .catch((error) => {
      // clear state, clear token
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, the following error(s) occurred.",
        error.response.data.error
      );
    });
}

export function signIn(dispatch, email, password) {
  const url = `${API_URL}/users/sign_in`;

  axios
    .post(url, { user: { email, password } })
    .then((resp) => {
      console.dir(resp);
      const token = resp.headers.authorization;
      saveTokenToStorage(token);
      setToken(dispatch, token);
      return resp
    })
    .then((resp) => {
      const role = resp.data.user.role
      setRole(dispatch, role)
      return resp
    })
    .then((resp) => {
      const profileComplete = resp.data.user.profileComplete
      setProfileComplete(dispatch, profileComplete)
      return resp
    })
    .then((_) => {
      displayNotification(dispatch, 3000, "success", "Welcome!", "It's nice to see you today.");
    })
    .catch((error) => {
      // clear state, clear token
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, unable to log in.",
        error.response.data.error
      );
    });
}

export function signOut(dispatch) {
  const url = `${API_URL}/users/sign_out`;
  const token = retrieveTokenFromStorage();

  axios
    .delete(url, { headers: { Authorization: token } })
    .then((_) => {
      deleteTokenFromStorage(token);
      clearToken(dispatch)
      clearRole(dispatch)
      clearProfileComplete(dispatch)
    })
    .then((_) => {
      displayNotification(
        dispatch,
        3000,
        "success",
        "You have been logged out.",
        "We hope to see you again soon!"
      );
    })
    .catch((error) => {
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, unable to log out.",
        error.response.data.error
      );
    });
}

export function validateToken(dispatch) {
  // ping API to check that jwt is still valid
}
