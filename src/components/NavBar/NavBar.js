import { Route, Switch } from "react-router-dom";
import { HomeIcon, Signup, Login, CheckIn, OnboardingBackLink } from "./_Links.js";
import Logout from "../Dashboard/__Logout";
import { useGlobalState } from "../../utils/globalContext.js";

export default function NavBar() {
  const {
    store: {
      onboardingStep,
      userProps: { token, profileComplete },
      redirectURL,
    },
  } = useGlobalState();
  const loggedIn = !!token;
  const onboardingEnd = onboardingStep > 4;
  const onboardingStart = onboardingStep < 1;

  return (
    <>
      {((!loggedIn || !profileComplete) && !redirectURL) && (
        <div className="fixed top-0 w-screen z-50 bg-gradient-to-t from-gray-900 to-gray-800">
          <nav
            className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <button
                  className="rounded-md focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-green-400
                focus:ring-offset-gray-900"
                >
                  <HomeIcon loggedIn={loggedIn} />
                </button>
              </div>
            </div>
            <div className="md:flex md:items-center md:space-x-6 space-x-2">
              <Switch>
                <Route
                  path="/login"
                  render={() => (
                    <>
                      <CheckIn /> <Signup />
                    </>
                  )}
                />
                <Route path="/signup" render={() => <Login />} />
                <Route
                  path="/onboarding"
                  render={() => (
                    <>
                      {!(onboardingEnd || onboardingStart) && <OnboardingBackLink />}
                      {!onboardingEnd && <Logout />}
                    </>
                  )}
                />
                <Route
                  path="/"
                  render={() => (
                    <>
                      <Login /> <Signup />
                    </>
                  )}
                />
              </Switch>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
