import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { passwordsMatch } from "./authHelpers";
import { useState } from "react";
import { useGlobalState } from "../../utils/globalContext";
import { signUp } from "../../api/ServicesAuth";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const { dispatch } = useGlobalState();
  const history = useHistory();

  const initialSignupData = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [signupData, setSignupData] = useState(initialSignupData);

  const handleSignupData = ({ target: { name, value } }) => {
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = signupData;

    if (passwordsMatch(dispatch, password, confirmPassword)) {
      signUp(dispatch, email, password)
        .then((_) => {
          history.push("/onboarding");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <div className="m-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24 max-w-sm">
          <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
              Create your new account
            </span>
          </h1>
          <div className="mt-10 sm:mt-12">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  data-testid="email-input"
                  required
                  autoFocus={true}
                  onChange={handleSignupData}
                  className="appearance-none relative block w-full mb-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    data-testid="password-input"
                    required
                    onChange={handleSignupData}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Enter a password"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password Confirmation
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    data-testid="password-confirmation-input"
                    required
                    onChange={handleSignupData}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  data-cy="submit-button"
                  className="group relative w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-green-400 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                >
                  Sign Up
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowCircleRightIcon
                      className="h-5 w-5 text-green-500 group-hover:text-green-400"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
