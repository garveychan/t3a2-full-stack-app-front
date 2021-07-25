import { signOut } from "../../api/ServicesAuth";
import { useGlobalState } from "../../utils/globalContext";

export default function Logout() {
  const { dispatch } = useGlobalState();

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(dispatch);
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex px-3 py-1 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-red-400 whitespace-nowrap"
    >
      Log Out
    </button>
  );
}
