import UserProfile from "./UserProfile";
import UserWaiver from "./UserWaiver";
import UserPricing from "./UserPricing";
import UserCheckout from "./UserCheckout";
import UserSuccess from "./UserSuccess";
import React, { useState, useEffect } from "react";

export default function Onboarding() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    climbingExperience: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    profilePhoto: null,
  };

  const { formData, setFormData } = useState(initialFormData);
  const { step, setStep } = useState(1);

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {}, [step]);

  return (
    <>
      {/* <UserProfile /> */}
      {/* <UserWaiver /> */}
      {/* <UserPricing/> */}
      {/* <UserCheckout/> */}
      <UserSuccess/>
    </>
  );
}
