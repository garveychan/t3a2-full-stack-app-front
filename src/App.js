import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CheckIn from "./components/CheckIn/CheckIn";
import Login from "./components/Login";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import Signup from "./components/Signup";
import Onboarding from "./components/Onboarding/Onboarding";

function App() {
  const signed_in = false;

  return (
    <>
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/login" render={() => <Login />} />
            <Route path="/recovery" render={() => <Recovery />} />
            <Route path="/reset" render={() => <Reset />} />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/onboarding" render={() => <Onboarding />} />
            <Route path="/dashboard"></Route>
            <Route path="/signout"></Route>
            <Route path="/">
              {signed_in ? <Redirect to="/dashboard" /> : <CheckIn />}
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
