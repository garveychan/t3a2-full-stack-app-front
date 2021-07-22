import UserProfile from "./_UserProfile";
import UserWaiver from "./_UserWaiver";
import UserPricing from "./_UserPricing";
import UserCheckout from "./_UserCheckout";
import UserSuccess from "./_UserSuccess";
import React, { useState } from "react";

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
    waiverSignature: null,
    waiverSignatureURI: null,
    subscriptionType: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);

  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };
  
  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
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

  switch (step) {
    case 1:
      return <UserProfile {...onboardingProps} />;
    case 2:
      return <UserWaiver {...onboardingProps} />;
    case 3:
      return <UserPricing {...onboardingProps} />;
    case 4:
      return <UserCheckout {...onboardingProps} />;
    case 5:
      return <UserSuccess {...onboardingProps} />;
    default:
  }
}
