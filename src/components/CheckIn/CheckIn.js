// Check-in page for users to submit emails to log a record on entry.
// Current landing page of the application.

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { checkIn } from "../../api/ServicesCheckIns";
import { setCheckInName } from "../../api/stateHelpers";
import { useGlobalState } from "../../utils/globalContext";
import { displayNotification } from "../_Notification";
import Button from "../_Button";

export default function CheckIn() {
  const { dispatch } = useGlobalState();
  const history = useHistory();

  const [emailForm, setEmailForm] = useState("");
  const [disable, setDisable] = useState(false);

  const handleInput = (e) => {
    setEmailForm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    checkIn(emailForm)
      .then((resp) => {
        setCheckInName(dispatch, resp.data.memberName);
      })
      .then((_) => {
        history.push("/checkin");
      })
      .catch((_) => {
        displayNotification(
          dispatch,
          3000,
          "error",
          "Sorry!",
          "We were unable to check you in.",
          "Please try again later."
        );
      })
      .finally((_) => setDisable(false));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-900 lg:px-8 lg:overflow-hidden">
      <div className="max-w-md px-4 m-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-6xl">
            <span className="block">Bouldering Gym</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">
              Member Check-In
            </span>
          </h1>
          <div className="mt-10 sm:mt-12">
            <form
              onSubmit={handleSubmit}
              className="sm:max-w-xl sm:mx-auto lg:mx-auto"
              autoComplete="off"
            >
              <div className="sm:flex">
                <div className="flex-1 min-w-0">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    data-testid="email-input"
                    placeholder="Enter your email"
                    value={emailForm}
                    onChange={handleInput}
                    required
                    autoFocus={true}
                    className="block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                  />
                </div>
                <div className="mt-3 sm:w-24 sm:mt-0 sm:ml-3">
                  <Button
                    props={{
                      disable: disable,
                      classNames:
                        "block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-green-400 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900",
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
