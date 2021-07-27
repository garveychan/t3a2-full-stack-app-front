import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { useGlobalState } from "../../utils/globalContext";
import { resetPassword } from "../../api/ServicesAuth";
import { passwordsMatch } from "./authHelpers";

export default function Reset(redirect = false) {
  const {
    store: { resetToken },
    dispatch,
  } = useGlobalState();
  const history = useHistory();

  const tokenQuery = new URLSearchParams(useLocation().search);
  const newToken = tokenQuery.get("reset_password_token");
  if (newToken) dispatch({ type: "setResetToken", data: newToken });

  const initialResetData = {
    password: "",
    confirmPassword: "",
  };

  const [resetData, setResetData] = useState(initialResetData);

  const handleResetData = ({ target: { name, value } }) => {
    setResetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = resetData;

    if (passwordsMatch(dispatch, password, confirmPassword)) {
      resetPassword(dispatch, resetToken, password)
        .then((_) => {
          history.push("/");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      {redirect && <Redirect to="/reset" />}
      <Route path="/reset">{resetToken || <Redirect to="/" />}</Route>
      <div className="m-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24 max-w-sm">
          <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
              Choose a new password
            </span>
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="password-input"
                  required
                  onChange={handleResetData}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="New password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  data-testid="password-confirmation-input"
                  required
                  onChange={handleResetData}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-green-400 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
