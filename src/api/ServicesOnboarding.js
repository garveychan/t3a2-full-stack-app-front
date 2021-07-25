import axios from "axios";
import { displayNotification } from "../components/_Notification";

const API_URL = process.env.REACT_APP_API_URL;

export function getOnboardingForm(dispatch) {
  const url = `${API_URL}/members/form`;

  return axios
    .get(url)
    .then((resp) => {
      return resp.data
    })
    .catch((error) => {
      console.error(error);
      displayNotification(
        dispatch,
        3000,
        "error",
        "Something went wrong.",
        "The onboarding form could not be retrieved.",
        "Please refresh the page and try again."
      )
    });
}
