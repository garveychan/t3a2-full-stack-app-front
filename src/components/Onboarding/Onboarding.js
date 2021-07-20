import UserProfile from "./UserProfile";
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

  return (
    <>
      <UserProfile />
    </>
  );
}
