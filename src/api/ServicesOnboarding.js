// API requests for onboarding new members.
// Retrieve the latest form information from the database -
// climbing experience categories, waiver, pricing.
// Construct the payload for populating a user record with profile details.
// This is sent as a form data so it can include a file (photo).

import axios from "axios";
import { displayNotification } from "../components/_Notification";
import { saveTokenToStorage } from "./storageHelpers";
import { resetOnboardingStep, setRedirectURL } from "./stateHelpers";

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
  const memberURL = `${API_URL}/members`;
  const paymentURL = `${API_URL}/payments/checkout`;
  const profileData = { ...formData };
  const profilePhoto = profileData.profilePhoto;

  delete profileData.profilePhoto;
  delete profileData.waiverSignature;
  delete profileData.subscriptionType;

  const payload = new FormData();
  payload.append("id", userProps.id);
  payload.append("profileData", JSON.stringify(profileData));
  payload.append("profilePhoto", profilePhoto);

  return axios
    .post(memberURL, payload, { headers: { Authorization: userProps.token } })
    .then((_) => {
      return axios
        .post(
          paymentURL,
          { id: userProps.id, pricingId: profileData.pricingId },
          { headers: { Authorization: userProps.token } }
        )
        .then((resp) => {
          const token = resp.headers.authorization;
          saveTokenToStorage(token);
          setRedirectURL(dispatch, resp.data.StripeSessionURL);
          resetOnboardingStep(dispatch);
        });
    })
    .catch((error) => Promise.reject(error));
}
