// Login form component.
// Controlled inputs which calls the API request when submitted.

import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import { useGlobalState } from "../../utils/globalContext";
import { signIn } from "../../api/ServicesAuth";
import Button from "../_Button";

export default function Login() {
  const { dispatch } = useGlobalState();
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    const elements = e.target.elements;
    const [email, password] = [elements.email.value, elements.password.value];

    signIn(dispatch, email, password)
      .then((_) => {
        history.push("/dashboard");
      })
      .catch((_) => {})
      .finally((_) => setDisable(false));
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <div className="m-auto max-w-md w-full sm:w-auto px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
              Member Login
            </span>
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="email-input"
                  required
                  autoFocus={true}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="password-input"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <Button
                props={{
                  disable: disable,
                  classNames:
                    "group relative w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-green-400 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900",
                }}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link to="/recovery" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
