import axios from "axios";
import { displayNotification } from "../components/_Notification";

const API_URL = process.env.REACT_APP_API_URL;

export function getOnboardingForm(dispatch) {
  const url = `${API_URL}/members/form`;

  return axios
    .get(url)
    .then((resp) => {
      return resp.data;
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
      );
    });
}

export function postOnboardingForm(dispatch, formData, userProps) {
  const url = `${API_URL}/members`;
  const profileData = { ...formData };
  const profilePhoto = profileData.profilePhoto;

  delete profileData.profilePhoto;
  delete profileData.waiverSignature;

  const payload = new FormData();
  payload.append("id", userProps.id);
  payload.append("profileData", JSON.stringify(profileData))
  payload.append("profilePhoto", profilePhoto);

  axios
    .post(url, payload, { headers: { Authorization: userProps.token } })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.error(error);
      displayNotification(
        dispatch,
        3000,
        "error",
        "Something went wrong.",
        "The server could not process the onboarding form.",
        "Please refresh the page and try again."
      );
    });
}
