// Helper methods related to authentication.
// E.g. ensuring that the submitted passwords match.

import { displayNotification } from "../_Notification";

export const passwordsMatch = (dispatch, password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  } else {
    displayNotification(
      dispatch,
      3000,
      "error",
      "Oops!",
      "Please make sure your passwords match."
    );
  }
};