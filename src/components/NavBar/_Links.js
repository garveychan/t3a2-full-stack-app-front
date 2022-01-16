// Individual link components for the navigation bar.
// Dynamic behaviour enabled by props passed through as arguments.

import { resetOnboardingStep } from "../../api/stateHelpers";
import { useGlobalState } from "../../utils/globalContext";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../api/ServicesAuth";

export const HomeIcon = ({ loggedIn }) => {
  const Logo = () => {
    return (
      <>
        <span className="sr-only">Bouldering Gym</span>
        <img
          className="w-auto h-12 mx-3 my-3 sm:h-16 sm:mx-6 sm:my-4"
          src="/bouldering_logo.svg"
          alt="Bouldering Logo"
        />
      </>
    );
  };
  return loggedIn ? (
    <Logo />
  ) : (
    <Link to="/">
      <Logo />
    </Link>
  );
};

export const Signup = () => {
  return (
    <Link
      to="/signup"
      className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700"
    >
      <button className="rounded-md focus:outline-none">Sign Up</button>
    </Link>
  );
};

export const Login = () => {
  return (
    <Link
      to="/login"
      className="text-base font-medium text-white hover:text-gray-300 "
    >
      <button className="rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900">
        Log in
      </button>
    </Link>
  );
};

export const CheckIn = () => {
  return (
    <Link
      to="/"
      className="text-base font-medium text-white hover:text-gray-300 "
    >
      <button className="rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900">
        Check In
      </button>
    </Link>
  );
};

export const OnboardingBackLink = () => {
  const {
    store: { onboardingStep },
    dispatch,
  } = useGlobalState();
  const firstOnboardingPage = onboardingStep === 1;
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "prevOnboardingStep" });
  };

  return (
    <>
      {firstOnboardingPage ? null : (
        <button
          onClick={handleClick}
          className="text-base font-medium text-white rounded-md hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
        >
          Back
        </button>
      )}
    </>
  );
};

export function Logout() {
  const { dispatch } = useGlobalState();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();

    signOut(dispatch)
      .then((_) => {
        resetOnboardingStep(dispatch);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex px-3 py-1 text-base font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-red-400 whitespace-nowrap"
    >
      Log Out
    </button>
  );
}
