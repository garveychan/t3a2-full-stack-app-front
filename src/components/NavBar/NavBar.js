import { Route, Link } from "react-router-dom";
import logo from "../../images/logo_1up.png";
import LinkSignup from "./_LinkSignup";
import LinkLogin from "./_LinkLogin";
import LinkCheckIn from "./_LinkCheckIn";
import LinkBack from "./_LinkBack";

export default function NavBar({ loggedIn }) {
  return (
    <>
      {loggedIn || (
        <div className="fixed top-0 w-screen z-50 bg-gradient-to-t from-gray-900 to-gray-800">
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
                      src={logo}
                      alt="1UP Logo"
                    />
                  </Link>
                </button>
              </div>
            </div>
            <div className="md:flex md:items-center md:space-x-6 space-x-2">
              <Route path="/login" component={LinkCheckIn} />
              <Route path="/onboarding" component={LinkBack} />
              <Route
                path={/^(?!.*(login|onboarding)).*$/}
                component={LinkLogin}
              />
              <Route
                path={/^(?!.*(signup|onboarding)).*$/}
                component={LinkSignup}
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
