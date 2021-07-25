import React, { useReducer } from "react";
import { GlobalContext } from "./utils/globalContext";
import globalReducer from "./utils/globalReducer";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";

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
  };

  const [store, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <Router>
        <Main />
      </Router>
    </GlobalContext.Provider>
  );
}
