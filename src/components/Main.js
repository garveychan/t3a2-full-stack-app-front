import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
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
import { Notification } from "./_Notification";
import { useGlobalState } from "../utils/globalContext";
import { useEffect } from "react";
import { clearUserProps, setUserProps } from "../api/_State";
import { retrieveTokenFromStorage } from "../api/_Storage";

export default function Main() {
  const {
    store: {
      userProps: { profileComplete, role, token },
    },
    dispatch,
  } = useGlobalState();

  const location = useLocation();
  useEffect(() => {
    const token = retrieveTokenFromStorage();
    token ? setUserProps(dispatch, token) : clearUserProps(dispatch);
  }, [location, dispatch]);

  const navBarProps = { token, profileComplete };
  const dashboardProps = { role };

  return (
    <Router>
      <NavBar {...navBarProps} />
      <Notification />
      {token ? (
        profileComplete ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/onboarding" />
        )
      ) : (
        <Redirect to="/" />
      )}
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/recovery" render={() => <Recovery />} />
        <Route path="/users/password/edit" render={() => <Reset redirect={true} />} />
        <Route path="/reset" render={() => <Reset />} />
        <Route path="/signup" render={() => <Signup />} />
        <Route path="/onboarding" render={() => <Onboarding />} />
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/failure" render={() => <Failure />} />
        <Route path="/dashboard" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/" render={() => <CheckIn />} />
      </Switch>
    </Router>
  );
}
