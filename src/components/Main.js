import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import CheckIn from "./CheckIn/CheckIn";
import Login from "./Auth/Login";
import Recovery from "./Auth/Recovery";
import Reset from "./Auth/Reset";
import Signup from "./Auth/Signup";
import Onboarding from "./Onboarding/Onboarding";
import Dashboard from "./Dashboard/Dashboard";
import { Notification } from "./_Notification";
import { useGlobalState } from "../utils/globalContext";
import { useEffect } from "react";
import { validateToken } from "../api/Services";

export default function Main() {
  const portalTheme = `h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden`;

  const {
    store: { authToken, profileComplete, role },
  } = useGlobalState();
  const loggedIn = !!authToken;
  const adminAccess = role === "admin";
  const navBarProps = { loggedIn, profileComplete };

  return (
    <Router>
      <NavBar {...navBarProps} />
      <Notification />
      {loggedIn ? (
        !adminAccess ? (
          profileComplete ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/onboarding" />
          )
        ) : (
          <Redirect to="/dashboard" />
        )
      ) : (
        <Redirect to="/" />
      )}
      <div className={portalTheme}>
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/recovery" render={() => <Recovery />} />
          <Route path="/reset" render={() => <Reset />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/onboarding" render={() => <Onboarding />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route path="/" render={() => <CheckIn />} />
        </Switch>
      </div>
    </Router>
  );
}
