// Top level of custom components in application.
// Initialises global state and provides store/dispatch reducer methods as context.

import React, { useReducer } from "react";
import { GlobalContext } from "./utils/globalContext";
import globalReducer from "./utils/globalReducer";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { useResponsiveViewHeight } from "./utils/customHooks";

export default function App() {
  const initialState = {
    notificationProps: {
      status: false,
      timer: 0,
      title: "",
      messages: [],
      type: null,
    },
    userProps: {
      id: null,
      email: null,
      profileComplete: null,
      stripeCustomer: null,
      role: null,
      token: null,
    },
    onboardingStep: 1,
    resetToken: null,
    redirectURL: "",
    checkInName: "",
  };

  const [store, dispatch] = useReducer(globalReducer, initialState);

  useResponsiveViewHeight();

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <Router>
        <Main />
      </Router>
    </GlobalContext.Provider>
  );
}
