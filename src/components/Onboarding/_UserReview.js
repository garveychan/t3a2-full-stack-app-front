// Final page of the onboarding process.
// User is asked to review their details and step back
// through the onboarding form if they wish to change anything.
// Signature is rendered from the array of points stored in state.
// Photo is rendered from the file attachment prepared for the form.

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postOnboardingForm } from "../../api/ServicesOnboarding";
import { useGlobalState } from "../../utils/globalContext";
import { mapCategories } from "./onboardingHelpers";
import { displayNotification } from "../_Notification";
import Button from "../_Button";

export default function UserReview({ formData, formQueries: { experienceLevels } }) {
  const {
    store: { userProps },
    dispatch,
  } = useGlobalState();
  const [disable, setDisable] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    postOnboardingForm(dispatch, formData, userProps)
      .then((_) => {
        history.push("/checkout");
      })
      .catch((error) => {
        const errorMessages = error.response.data.errors || "";
        displayNotification(
          dispatch,
          3000,
          "error",
          "Sorry, the server couldn't process your details.",
          errorMessages
            .replace("Validation failed: ", "")
            .split(", ")
            .map((message) => message + ".")
        );
      })
      .finally((_) => setDisable(false));
  };

  const {
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    climbingExperience,
    street,
    city,
    state,
    postcode,
    country,
    profilePhoto,
    waiverName,
    waiverSignatureURI,
    subscriptionType,
  } = formData;

  const urlFromObject = (object) => {
    return object ? URL.createObjectURL(object) : "";
  };

  const imageWrapper = (name, string) => {
    return <img src={string} alt={name} />;
  };

  const profileInfo = [
    { name: "Full Name", value: `${firstName} ${lastName}` },
    { name: "Date of Birth", value: dateOfBirth },
    { name: "Phone Number", value: phoneNumber },
    {
      name: "Climbing Experience",
      value: mapCategories(experienceLevels, climbingExperience, "id", "experience_level"),
    },
    { name: "Full Address", value: `${street}, ${city}, ${state}, ${postcode}, ${country}` },
    {
      name: "Profile Photo",
      value: imageWrapper("Profile Photo", urlFromObject(profilePhoto)),
    },
    { name: "Signature Name", value: waiverName },
    { name: "Signature", value: imageWrapper("Signature", waiverSignatureURI) },
    { name: "Subscription Type", value: subscriptionType },
  ];

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <div className="max-w-md max-h-screen px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="pt-12 lg:py-24">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
            <span className="mt-5 lg:mt-0 pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400">
              Profile Review
            </span>
          </h1>
          <div className="bg-white shadow max-h-screen-2/3 overflow-y-scroll rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Profile Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please review your details and ensure they're correct.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {profileInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 flex flex-col items-center`}
                  >
                    <dt className="text-sm font-medium text-gray-500">{info.name}</dt>
                    <dd className="w-3/4 mt-3 text-sm text-gray-900 flex justify-center">
                      {info.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="my-4 sm:my-8">
              <Button
                props={{
                  disable: disable,
                  classNames:
                    "w-1/2 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm",
                  onClick: handleSubmit,
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
