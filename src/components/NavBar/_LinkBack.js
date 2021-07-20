import { Link } from "react-router-dom";

export default function LinkBack() {
  return (
    <button
      className="text-base font-medium text-white hover:text-gray-300 rounded-md focus:outline-none focus:ring-2
  focus:ring-offset-2 focus:ring-green-400
  focus:ring-offset-gray-900"
    >
      <Link to="/">Back</Link>
    </button>
  );
}
