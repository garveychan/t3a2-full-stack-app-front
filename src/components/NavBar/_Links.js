import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Link
      to="/signup"
      className="inline-flex items-center px-4 py-2 border
    border-transparent text-base font-medium rounded-md text-white
    bg-green-500 hover:bg-green-700 "
    >
      <button
        className="rounded-md focus:outline-none"
      >
        Sign Up
      </button>
    </Link>
  );
}

const Login = () => {
  return (
    <Link
      to="/login"
      className="text-base font-medium text-white hover:text-gray-300 "
    >
      <button className="rounded-md focus:outline-none focus:ring-2
  focus:ring-offset-2 focus:ring-green-400
  focus:ring-offset-gray-900">Log in</button>
    </Link>
  );
}

const CheckIn = () => {
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
}

const Back = () => {
  return (
    <Link to="/" className="text-base font-medium text-white hover:text-gray-300 ">
      <button
        className="rounded-md focus:outline-none focus:ring-2
  focus:ring-offset-2 focus:ring-green-400
  focus:ring-offset-gray-900"
      >
        Back
      </button>
    </Link>
  );
}

export {
  Signup,
  Login,
  CheckIn,
  Back
}