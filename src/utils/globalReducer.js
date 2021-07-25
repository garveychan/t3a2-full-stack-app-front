export default function globalReducer(state, action) {
  const { type, data } = action;

  switch (type) {
    case "setNotificationProps": {
      return {
        ...state,
        notificationProps: data,
      };
    }
    case "setUserProps": {
      return {
        ...state,
        userProps: data,
      };
    }
    case "setResetToken": {
      return {
        ...state,
        resetToken: data,
      };
    }
    case "prevOnboardingStep": {
      const { onboardingStep } = state;
      const newStep = onboardingStep - 1;
      return {
        ...state,
        onboardingStep: newStep,
      };
    }
    case "nextOnboardingStep": {
      const { onboardingStep } = state;
      const newStep = onboardingStep + 1;
      return {
        ...state,
        onboardingStep: newStep,
      };
    }
    case "resetOnboardingStep": {
      return {
        ...state,
        onboardingStep: 1,
      };
    }
    case "setRedirectURL": {
      return {
        ...state,
        redirectURL: data,
      };
    }
    default:
      return state;
  }
}
