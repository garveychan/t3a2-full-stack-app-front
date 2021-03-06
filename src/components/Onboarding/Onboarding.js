// Onboarding workflow - multi-page/step form.
// Form details stored as state in this parent component
// as the user works through each step of the onboarding process.
// Queries and criteria are retrieved from the database - 
// e.g. experience level categories, the current waiver, and pricing models.
// Form is dynamically generated based on the information received.
// Form information is populated when the component mounts and
// cleaned up when component unmounts to prevent memory leaks.
// Onboarding stage is stored and managed in global state so navigation bar
// has context for dynamic link generation.

import UserProfile from "./_UserProfile";
import UserWaiver from "./_UserWaiver";
import UserPricing from "./_UserPricing";
import UserReview from "./_UserReview";
import React, { useEffect, useState, useMemo } from "react";
import { useGlobalState } from "../../utils/globalContext";
import { getOnboardingForm } from "../../api/ServicesOnboarding";

export default function Onboarding() {
  const memoizedInitialFormData = useMemo(() => {
    return {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      climbingExperience: 1,
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
      pricingId: null,
    };
  }, []);

  const initialFormQueries = {
    experienceLevels: null,
    waiverContent: null,
    waiverDeclaration: null,
  };

  const [formData, setFormData] = useState(memoizedInitialFormData);
  const [formQueries, setFormQueries] = useState(initialFormQueries);

  const {
    store: { onboardingStep, userProps },
    dispatch,
  } = useGlobalState();

  useEffect(() => {
    let mounted = true;

    if (!initialFormQueries.experienceLevels) {
      getOnboardingForm(dispatch, userProps)
        .then((data) => {
          const {
            currentWaiver: { content: waiverContent, declaration: waiverDeclaration },
            experienceLevels,
          } = data;
          mounted && data && setFormQueries({ experienceLevels, waiverContent, waiverDeclaration });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      mounted = false;
      setFormData(memoizedInitialFormData);
    };
  }, [dispatch, memoizedInitialFormData, initialFormQueries.experienceLevels, userProps]);

  const prevStep = (e) => {
    e.preventDefault();
    dispatch({ type: "prevOnboardingStep" });
  };

  const nextStep = (e) => {
    e.preventDefault();
    dispatch({ type: "nextOnboardingStep" });
  };

  const handleFormData = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onboardingProps = {
    prevStep,
    nextStep,
    handleFormData,
    formData,
    formQueries,
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
      return <></>;
  }
}
