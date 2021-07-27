// Main page of the application.
// Renders all top level components and enables routing logic.
// useEffect hook with a location dependency checks for a JWT in storage
// with every new page visited. Token is decoded and properties are set
// to global state to inform the flow of the application. If the token
// is corrupted or no longer exists, global state is cleared of the user's
// properties and the application returns to the landing page.

import NavBar from "./NavBar/NavBar";
import CheckIn from "./CheckIn/CheckIn";
import Login from "./Auth/Login";
import Recovery from "./Auth/Recovery";
import Reset from "./Auth/Reset";
import Signup from "./Auth/Signup";
import Onboarding from "./Onboarding/Onboarding";
import Checkout from "./Onboarding/Checkout";
import Failure from "./Onboarding/Failure";
import Dashboard from "./Dashboard/Dashboard";
import CheckInSuccess from "./CheckIn/_CheckInSuccess";
import { AuthRoute } from "../utils/AuthRoute";
import { useEffect } from "react";
import { Notification } from "./_Notification";
import { useGlobalState } from "../utils/globalContext";
import { clearUserProps, setUserProps } from "../api/stateHelpers";
import { retrieveTokenFromStorage } from "../api/storageHelpers";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

export default function Main() {
  const {
    store: {
      userProps: { profileComplete, role, token },
    },
    dispatch,
    redirectURL,
    onboardingStep,
  } = useGlobalState();
  const adminAccess = role === "admin";
  const loggedIn = !!token;

  const location = useLocation();
  useEffect(() => {
    const token = retrieveTokenFromStorage();
    token ? setUserProps(dispatch, token) : clearUserProps(dispatch);
  }, [location, dispatch]);

  const sessionProps = { loggedIn, profileComplete, adminAccess, redirectURL, onboardingStep };

  return (
    <Router>
      <NavBar {...sessionProps} />
      <Notification />
      <AuthRoute {...sessionProps} />
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/recovery" render={() => <Recovery />} />
        <Route path="/users/password/edit" render={() => <Reset redirect={true} />} />
        <Route path="/reset" render={() => <Reset />} />
        <Route path="/signup" render={() => <Signup />} />
        <Route path="/onboarding" render={() => <Onboarding />} />
        <Route path="/dashboard" render={() => <Dashboard {...sessionProps} />} />
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/failure" render={() => <Failure />} />
        <Route path="/checkin" render={() => <CheckInSuccess />} />
        <Route path="/" render={() => <CheckIn />} />
      </Switch>
    </Router>
  );
}
