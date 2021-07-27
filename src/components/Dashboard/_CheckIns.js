import { useCallback, useEffect, useState } from "react";
import { getCheckIns } from "../../api/ServicesAdmins";
import { useInterval } from "../../utils/customHooks";
import { useGlobalState } from "../../utils/globalContext";
import { displayNotification } from "../_Notification";
import { parseISO } from "date-fns";

const columns = ["Name", "Address", "Date of Birth", "Waiver Status", "Check-in Time"];

export default function CheckIns() {
  const {
    store: { userProps },
    dispatch,
  } = useGlobalState();

  const initialCheckIn = {
    id: "",
    image: "",
    name: "",
    email: "",
    streetAddress: "",
    townAddress: "",
    dateOfBirth: "",
    waiverStatus: null,
    checkInTime: "",
  };

  const [checkIns, setCheckIns] = useState([]);
  const [currentCheckIn, setCurrentCheckIn] = useState(initialCheckIn);
  const [members, setMembers] = useState([]);
  const [failedRequest, setFailedRequest] = useState(false);

  const pollCheckIns = useCallback(() => {
    const findMember = (id) => {
      for (const el of members) {
        if (id === el.member.user.id) {
          return el.member;
        }
      }
    };

    const updateCheckIns = (newCheckIns, newMembers) => {
      setMembers(newMembers);

      const checkInLog = [];
      for (const checkIn of newCheckIns) {
        try {
          const {
            photo,
            waiver,
            user: { email, id },
            profile: { first_name, last_name, date_of_birth },
            address: { street_address, city, state, postcode, country },
          } = findMember(checkIn.user_id);

          const timestamp = parseISO(checkIn.created_at);

          checkInLog.push({
            id: id,
            image: photo,
            name: `${first_name} ${last_name}`,
            email: email,
            streetAddress: `${street_address}, ${city}`,
            townAddress: `${state} ${postcode} ${country}`,
            dateOfBirth: date_of_birth,
            waiverStatus: !!waiver,
            checkInTime: `${timestamp.toLocaleTimeString()}, ${timestamp.toDateString()}`,
          });
        } catch (e) {}
      }

      if (checkInLog[0]) setCurrentCheckIn(checkInLog.shift());
      setCheckIns(checkInLog);
    };

    if (!failedRequest) {
      getCheckIns(userProps)
        .then(({ newCheckIns, newMembers }) => {
          if (currentCheckIn && currentCheckIn.id !== newCheckIns[0].user_id) {
            updateCheckIns(newCheckIns, newMembers);
          }
        })
        .catch((_) => {
          setFailedRequest(true);
          displayNotification(
            dispatch,
            600000,
            "error",
            "Sorry, something went wrong.",
            "The check-in log could not be updated.",
            "Please contact your system administrator."
          );
        });
    }
  }, [currentCheckIn, dispatch, userProps, members, failedRequest]);

  useEffect(() => {
    pollCheckIns();
  }, [pollCheckIns]);

  useInterval(5000, pollCheckIns);

  return (
    <div className="space-y-8 w-full">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-lg">
        <div className="justify-between items-center flex flex-col lg:flex-row">
            <div className="w-3/4 lg:w-1/2 flex justify-center">
              <img
                className="h-60 w-60 object-cover rounded-full"
                src={currentCheckIn.image}
                alt=""
              />
            </div>
          <dl className="mt-4 lg:mt-0 w-2/3 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:text-left text-center">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentCheckIn.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentCheckIn.dateOfBirth}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentCheckIn.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Waiver Status</dt>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  currentCheckIn.waiverStatus
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {currentCheckIn.waiverStatus ? "Signed" : "Not Signed"}
              </span>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {currentCheckIn.streetAddress}, {currentCheckIn.townAddress}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Check-in Time</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {currentCheckIn.checkInTime.toString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((name, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-4 py-3 text-xs font-medium text-gray-500 text-left uppercase tracking-wider"
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {checkIns.map((person, index) => (
                    <tr key={index} className="text-left">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.streetAddress}</div>
                        <div className="text-sm text-gray-500">{person.townAddress}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.dateOfBirth}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            person.waiverStatus
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {person.waiverStatus ? "Signed" : "Not Signed"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.checkInTime.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
