import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CheckIn from "./components/CheckIn/CheckIn";
import Login from "./components/Auth/Login";
import Recovery from "./components/Auth/Recovery";
import Reset from "./components/Auth/Reset";
import Signup from "./components/Auth/Signup";
import Onboarding from "./components/Onboarding/Onboarding";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const portalTheme = `h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden`;

  return (
    <div className={loggedIn ? "" : portalTheme}>
      <Router>
        <NavBar loggedIn={loggedIn} />
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/recovery" render={() => <Recovery />} />
          <Route path="/reset" render={() => <Reset />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/onboarding" render={() => <Onboarding />} />
          <Route path="/dashboard">{loggedIn ? <Dashboard /> : <Redirect to="/" />}</Route>
          <Route path="/logout"></Route>
          <Route path="/">{loggedIn ? <Redirect to="/dashboard" /> : <CheckIn />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
