// Functions related to API requests for Authentication and Authorisation.
// Includes sign up, sign in, password reset methods.
// Notifications displayed based on the responses and Promises returned to the components which initialised the requests.

import axios from "axios";
import { displayNotification } from "../components/_Notification";
import {
  retrieveTokenFromStorage,
  saveTokenToStorage,
  deleteTokenFromStorage,
} from "./storageHelpers";
import { clearResetToken, clearUserProps, setUserProps } from "./stateHelpers";

const API_URL = process.env.REACT_APP_API_URL;

export function signUp(dispatch, email, password) {
  const url = `${API_URL}/users`;

  return axios
    .post(url, { user: { email, password } })
    .then((resp) => {
      const token = resp.headers.authorization;
      saveTokenToStorage(token);
      setUserProps(dispatch, token);
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
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, the following error(s) occurred.",
        error.response.data.error
      );
      return Promise.reject(error);
    });
}

export function signIn(dispatch, email, password) {
  const url = `${API_URL}/users/sign_in`;

  return axios
    .post(url, { user: { email, password } })
    .then((resp) => {
      const token = resp.headers.authorization;
      saveTokenToStorage(token);
      setUserProps(dispatch, token);
    })
    .then((_) => {
      displayNotification(
        dispatch,
        3000,
        "success",
        "Welcome!",
        "It's nice to see you here today."
      );
    })
    .catch((error) => {
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, unable to log in.",
        error.response.data.error
      );
      return Promise.reject(error);
    });
}

export function signOut(dispatch) {
  const url = `${API_URL}/users/sign_out`;
  const token = retrieveTokenFromStorage();

  return axios
    .delete(url, { headers: { Authorization: token } })
    .then((_) => {
      deleteTokenFromStorage(token);
      clearUserProps(dispatch);
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
      deleteTokenFromStorage(token);
      clearUserProps(dispatch);
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, something went wrong.",
        error.response.data.error
      );
      return Promise.reject(error);
    });
}

export function getRecoveryEmail(email) {
  const url = `${API_URL}/users/password`;

  return axios.post(url, { user: { email } }).catch((error) => Promise.reject(error));
}

export function resetPassword(dispatch, resetToken, password) {
  const url = `${API_URL}/users/password`;

  return axios
    .patch(url, { user: { reset_password_token: resetToken, password: password } })
    .then((_) => {
      clearResetToken(dispatch);
      displayNotification(
        dispatch,
        3000,
        "success",
        "Success!",
        "Your password was successfully changed."
      );
    })
    .catch((error) => {
      displayNotification(
        dispatch,
        3000,
        "error",
        "Sorry, the following error(s) occurred.",
        error.response.data.error
      );
      return Promise.reject(error);
    });
}
