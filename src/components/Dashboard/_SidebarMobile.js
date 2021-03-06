// Collapsed dashboard sidebar for Mobile.

import { XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SidebarMobile({
  sidebarOpen,
  setSidebarOpen,
  classNames,
  navLinks,
  url,
  dashboardPage,
  setDashboardPage,
}) {
  const handleClick = (_, item) => {
    setDashboardPage(item);
    setSidebarOpen(false);
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-40 flex md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="sr-only">Bouldering Gym</span>
              <img className="w-auto h-8 sm:h-10" src="/bouldering_logo.svg" alt="Bouldering Gym" />
            </div>
            <div className="flex-1 h-0 mt-5 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navLinks.map((item) => (
                  <Link
                    to={url + item.href}
                    key={item.name}
                    onClick={(e) => handleClick(e, item)}
                    className={classNames(
                      dashboardPage === item
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        dashboardPage === item
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-4 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
}
