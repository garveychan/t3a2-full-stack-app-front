import UserProfile from "./_UserProfile";
import UserWaiver from "./_UserWaiver";
import UserPricing from "./_UserPricing";
import UserReview from "./_UserReview";
import React, { useState } from "react";
import { useGlobalState } from "../../utils/globalContext";

export default function Onboarding() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    climbingExperience: "Novice",
    street: "",
    city: "",
    state: "",
    postcode: "",
    country: "Australia",
    profilePhoto: null,
    waiverName: "",
    waiverSignature: null,
    waiverSignatureURI: null,
    subscriptionType: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const {
    store: { onboardingStep },
    dispatch,
  } = useGlobalState();

  const prevStep = (e) => {
    e.preventDefault();
    dispatch({type:"prevOnboardingStep"})
  };

  const nextStep = (e) => {
    e.preventDefault();
    dispatch({type:"nextOnboardingStep"})
  };

  const handleFormData = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onboardingProps = {
    prevStep,
    nextStep,
    handleFormData,
    formData,
  };

  switch (onboardingStep) {
    case 1:
      return <UserProfile {...onboardingProps} />;
    case 2:
      return <UserWaiver {...onboardingProps} />;
    case 3:
      return <UserPricing {...onboardingProps} />;
    case 4:
      return <UserReview {...onboardingProps} />;
    default:
      return <></>
  }
}
