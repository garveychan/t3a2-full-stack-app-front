import { useGlobalState } from "../../utils/globalContext";
import { displayNotification } from "../_Notification";

export default function Recovery() {
  const {dispatch} = useGlobalState()

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    // onRecovery(email)
    displayNotification(
      dispatch,
      3000,
      "success",
      "Success!",
      `Your password reset link has been sent to ${email}.`
    );
    e.target.elements.email.value = "";
  };

  return (
    <div className="m-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
      <div className="lg:py-24">
        <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
          <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
            Forgot your password?
          </span>
          <span className="block">No worries.</span>
        </h1>
        <div className="mt-10 sm:mt-12">
          <form onSubmit={handleSubmit} className="sm:max-w-xl sm:mx-auto lg:mx-auto">
            <div className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  data-testid="email-input"
                  placeholder="Enter your email"
                  className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
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
  );
}
