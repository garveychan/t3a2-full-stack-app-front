import Logout from "./__Logout";
import { MenuAlt2Icon } from "@heroicons/react/outline";

export default function Header({ dashboardPage, setSidebarOpen }) {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between items-center">
        <h1 className="px-4 text-2xl font-semibold text-gray-900 whitespace-nowrap">
          {dashboardPage.name}
        </h1>
        <Logout />
      </div>
    </div>
  );
}
