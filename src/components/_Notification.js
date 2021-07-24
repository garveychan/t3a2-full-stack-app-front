import { Fragment, useState, useEffect } from "react";
import { useGlobalState } from "../utils/globalContext";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

export function displayNotification(dispatch, timer, type, title, ...messages) {
  dispatch({
    type: "setNotificationProps",
    data: {
      status: true,
      timer: timer,
      title: title,
      messages: messages.flat(),
      type: type,
    },
  });

  setTimeout(() => {
    dispatch({
      type: "setNotificationProps",
      data: {
        status: false,
        timer: null,
        title: "",
        messages: [],
        type: null,
      },
    });
  }, timer);
}

export function Notification() {
  const {
    store: {
      notificationProps: { status, timer, title, messages, type },
    },
  } = useGlobalState();

  const [show, setShow] = useState(status);

  useEffect(() => {
    setShow(status);

    setTimeout(() => {
      setShow(false);
    }, timer);
  }, [status, timer]);

  const iconType = () => {
    switch (type) {
      case "error":
        return <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />;
      case "warning":
        return <ExclamationIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />;
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />;
      default:
        return;
    }
  };

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-50 fixed inset-y-14 inset-x-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center text-left space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{iconType()}</div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    {messages.map((message, index) => (
                      <p key={index} className="mt-1 text-sm text-gray-500">
                        {message}
                      </p>
                    ))}
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
