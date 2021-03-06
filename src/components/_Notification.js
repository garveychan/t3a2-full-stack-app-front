// Reuseable notification component of the application.
// Rendered at the top level and hidden until called via
// the dispatch action which alters the state of the component.
// Component is then displayed based on the supplied arguments,
// dictating how long it should persist, notification type,
// title of the notification, and as many messages as the invoking
// function would like to pass - aggregated with a rest operator and mapped accordingly.

import { Fragment, useState, useEffect } from "react";
import { useGlobalState } from "../utils/globalContext";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

export function displayNotification(dispatch, timer, type, title, ...messages) {
  dispatch({
    type: "setNotificationProps",
    data: {
      status: true,
      timer,
      title,
      messages: messages.flat(),
      type,
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

    let notificationTimer;
    notificationTimer = setTimeout(() => void setShow(false), timer);

    return () => void clearTimeout(notificationTimer);
  }, [status, timer]);

  const iconType = () => {
    switch (type) {
      case "error":
        return (
          <ExclamationCircleIcon
            className="w-6 h-6 text-red-400"
            aria-hidden="true"
          />
        );
      case "warning":
        return (
          <ExclamationIcon
            className="w-6 h-6 text-yellow-400"
            aria-hidden="true"
          />
        );
      case "success":
        return (
          <CheckCircleIcon
            className="w-6 h-6 text-green-400"
            aria-hidden="true"
          />
        );
      default:
        return;
    }
  };

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-x-0 z-50 flex items-end px-4 py-6 pointer-events-none inset-y-14 sm:p-6 sm:items-start"
      >
        <div className="flex flex-col items-center w-full space-y-4 text-left sm:items-end">
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
            <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
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
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="w-5 h-5" aria-hidden="true" />
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
