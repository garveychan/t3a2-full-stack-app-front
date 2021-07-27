import { useState } from "react";
import { useHistory } from "react-router-dom";
import { checkIn } from "../../api/ServicesAdmins";
import { setCheckInName } from "../../api/_State";
import { useGlobalState } from "../../utils/globalContext";
import { displayNotification } from "../_Notification";

export default function CheckIn() {
  const { dispatch } = useGlobalState();
  const history = useHistory();

  const [emailForm, setEmailForm] = useState("");

  const handleInput = (e) => {
    setEmailForm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      });
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <div className="m-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24">
          <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
            <span className="block">1UP Bouldering</span>
            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
              Member Check-In
            </span>
          </h1>
          <div className="mt-10 sm:mt-12">
            <form onSubmit={handleSubmit} className="sm:max-w-xl sm:mx-auto lg:mx-auto" autoComplete="off">
              <div className="sm:flex">
                <div className="min-w-0 flex-1">
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
                    className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    data-cy="submit-button"
                    className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-green-400 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
