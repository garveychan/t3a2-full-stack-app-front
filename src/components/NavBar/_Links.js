import { Link } from "react-router-dom";
import logo from "../../images/logo_1up.png";
import { useGlobalState } from "../../utils/globalContext";

export const HomeIcon = ({ loggedIn }) => {
  const Logo = () => {
    return (
      <>
        <span className="sr-only">1UP Bouldering Gym</span>
        <img className="h-8 w-auto sm:h-10" src={logo} alt="1UP Logo" />
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
      className="inline-flex items-center px-4 py-2 border
    border-transparent text-base font-medium rounded-md text-white
    bg-green-500 hover:bg-green-700 "
    >
      <button className="rounded-md focus:outline-none">Sign Up</button>
    </Link>
  );
};

export const Login = () => {
  return (
    <Link to="/login" className="text-base font-medium text-white hover:text-gray-300 ">
      <button
        className="rounded-md focus:outline-none focus:ring-2
  focus:ring-offset-2 focus:ring-green-400
  focus:ring-offset-gray-900"
      >
        Log in
      </button>
    </Link>
  );
};

export const CheckIn = () => {
  return (
    <Link to="/" className="text-base font-medium text-white hover:text-gray-300 ">
      <button
        className="rounded-md focus:outline-none focus:ring-2
    focus:ring-offset-2 focus:ring-green-400
    focus:ring-offset-gray-900"
      >
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
          className="text-base font-medium text-white hover:text-gray-300 rounded-md focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-green-400
          focus:ring-offset-gray-900"
        >
          Back
        </button>
      )}
    </>
  );
};
