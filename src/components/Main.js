import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import CheckIn from "./CheckIn/CheckIn";
import Login from "./Auth/Login";
import Recovery from "./Auth/Recovery";
import Reset from "./Auth/Reset";
import Signup from "./Auth/Signup";
import Onboarding from "./Onboarding/Onboarding";
import Dashboard from "./Dashboard/Dashboard";
import { useGlobalState } from "../utils/globalContext";

export default function Main() {
  const portalTheme = `h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden`;

  const {
    store: { loggedIn },
  } = useGlobalState();

  return (
      <div className={loggedIn ? "" : portalTheme}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/login" render={() => <Login />} />
            <Route path="/recovery" render={() => <Recovery />} />
            <Route path="/reset" render={() => <Reset />} />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/onboarding" render={() => <Onboarding />} />
            <Route path="/dashboard">
              {loggedIn ? <Dashboard /> : <Redirect to="/" />}
            </Route>
            <Route path="/logout"></Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/dashboard" /> : <CheckIn />}
            </Route>
          </Switch>
        </Router>
      </div>
  );
}
