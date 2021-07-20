import { Link } from "react-router-dom";

export default function LinkSignup() {
  return(
    <button
    className="inline-flex items-center px-4 py-2 border
      border-transparent text-base font-medium rounded-md text-white
      bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2
      focus:ring-offset-2 focus:ring-green-400
      focus:ring-offset-gray-900"
  >
    <Link to="/signup">Sign Up</Link>
  </button>
  )
}