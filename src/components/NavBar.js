import navbar_logo from "../images/navbar_logo.png";

export default function NavBar() {
  return (
    <>
      <div className="fixed top-0 w-screen">
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <button
                className="rounded-md focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-green-400
              focus:ring-offset-gray-900"
              >
                <a href="#">
                  <span className="sr-only">1UP Bouldering Gym</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src={navbar_logo}
                    alt="1UP Logo"
                  />
                </a>
              </button>
            </div>
          </div>
          <div className="md:flex md:items-center md:space-x-6 space-x-2">
            <button
              className="text-base font-medium text-white hover:text-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-green-400
              focus:ring-offset-gray-900"
            >
              <a href="https://www.google.com">Log in</a>
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border
              border-transparent text-base font-medium rounded-md text-white
              bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-green-400
              focus:ring-offset-gray-900"
            >
              <a href="#">Sign Up</a>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
