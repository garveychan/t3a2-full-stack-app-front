import { Route, Switch } from "react-router-dom";
import { HomeIcon, Signup, Login, CheckIn, OnboardingBackLink } from "./_Links.js";
import { Logout } from "../NavBar/_Links";
import { useEffect } from "react";

export default function NavBar({ loggedIn, profileComplete, redirectURL, onboardingStep }) {
  const onboardingEnd = onboardingStep > 4;
  const onboardingStart = onboardingStep < 1;

  useEffect(() => {}, [loggedIn, profileComplete, onboardingStep, redirectURL]);

  return (
    <>
      {(!loggedIn || !profileComplete) && !redirectURL && (
        <div className="fixed top-0 w-screen z-50 bg-gradient-to-t from-gray-900 to-gray-800">
          <nav
            className="mx-auto flex items-center justify-between"
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
            <div className="md:flex md:items-center md:space-x-6 space-x-2 mx-3 sm:mx-6">
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
                <Route path="/checkout" render={() => null} />
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
