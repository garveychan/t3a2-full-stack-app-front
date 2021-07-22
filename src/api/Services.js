import axios from "axios";
import { displayNotification } from "../components/_Notification";

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = "session_token";

export function signUp(dispatch, email, password) {
  const signUpURL = `${API_URL}/users`;

  axios
    .post(signUpURL, { user: { email, password } })
    .then((resp) => {
      const token = resp.headers.authorization;
      return setToken(token);
    })
    .then((token) => {
      dispatch({ type: "setToken", data: token });
    })
    .then((_) => {
      displayNotification(dispatch, 3000, "success", "Welcome!", "Your account was successfully created.");
    })
    .catch((error) => {
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
      const token = resp.headers.authorization;
      return setToken(token);
    })
    .then((token) => {
      dispatch({ type: "setToken", data: token });
    })
    .then((_) => {
      displayNotification(dispatch, 3000, "success", "Welcome!", "It's nice to see you today.");
    })
    .catch((error) => {
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
  const token = getToken();

  axios
    .delete(url, { headers: { Authorization: token } })
    .then((_) => {
      return removeToken(token);
    })
    .then((_) => {
      dispatch({ type: "setToken", data: null });
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

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  return true;
}
