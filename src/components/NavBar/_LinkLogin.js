import { Link } from "react-router-dom";

export default function LinkLogin() {
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
