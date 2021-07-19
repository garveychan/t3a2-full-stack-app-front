import { Route, Link } from "react-router-dom";
import navbar_logo from "../../images/navbar_logo.png";
import LinkSignup from "./LinkSignup";
import LinkLogin from "./LinkLogin";
import LinkCheckIn from "./LinkCheckIn";
import LinkBack from "./LinkBack";

export default function NavBar() {
  return (
    <div className="fixed top-0 w-screen">
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <button
              className="rounded-md focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-green-400
              focus:ring-offset-gray-900"
            >
              <Link to="/">
                <span className="sr-only">1UP Bouldering Gym</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={navbar_logo}
                  alt="1UP Logo"
                />
              </Link>
            </button>
          </div>
        </div>
        <div className="md:flex md:items-center md:space-x-6 space-x-2">
          <Route path="/login" component={LinkCheckIn}/>
          <Route path="/onboarding" component={LinkBack}/>
          <Route path={/^(?!.*(login|onboarding)).*$/} component={LinkLogin}/>
          <Route path={/^(?!.*(signup|onboarding)).*$/} component={LinkSignup}/>
        </div>
      </nav>
    </div>
  );
}
