// Initial profile completion page of onboarding workflow.
// Rigorous validations aligned with database model validations
// e.g. date of birth can't be in the future and fields must be completed.
// Photo upload is a drag/drop zone which shows a preview of the uploaded image.
// Categories dynamically generated from database ids and mapped to corresponding names.

import { useEffect } from "react";
import { useGlobalState } from "../../utils/globalContext";
import { displayNotification } from "../_Notification";
import UserPhotoUpload from "./__UserPhotoUpload";
import { mapCategories } from "./onboardingHelpers";

export default function UserProfile({
  nextStep,
  handleFormData,
  formData,
  formQueries: { experienceLevels },
}) {
  const handleExperience = (e) => {
    const experienceId = mapCategories(experienceLevels, e.target.value, "experience_level", "id");

    const mappedExperience = {
      target: {
        name: "climbingExperience",
        value: experienceId,
      },
    };

    handleFormData(mappedExperience);
  };

  const { dispatch } = useGlobalState();

  const validateForm = (e) => {
    e.preventDefault();

    const checkProps = () => {
      const props = [
        "firstName",
        "lastName",
        "dateOfBirth",
        "phoneNumber",
        "climbingExperience",
        "street",
        "city",
        "state",
        "postcode",
        "country",
        "profilePhoto",
      ];

      for (const prop of props) {
        if (!formData[prop]) return false;
      }

      return true;
    };

    if (checkProps()) {
      nextStep(e);
    } else {
      displayNotification(
        dispatch,
        3000,
        "warning",
        "Oops!",
        "Please ensure that you have completed all the fields and checked that the responses are valid."
      );
    }
  };

  useEffect(() => {
    (function setMaxDateOfBirth() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }

      today = yyyy + "-" + mm + "-" + dd;
      document.getElementById("date-of-birth").setAttribute("max", today);
    })();
  }, []);

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <div className="max-w-md max-h-screen px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
            <span className="mt-5 lg:mt-0 pb-2 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400">
              Let's get your details
            </span>
          </h1>
          <div className="max-h-screen-2/3 mt-4 p-10 overflow-y-scroll bg-gray-100 rounded-lg">
            <form className="space-y-8">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleFormData}
                      autoFocus={true}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="date-of-birth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="date-of-birth"
                      value={formData.dateOfBirth}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phone-number"
                      autoComplete="tel"
                      value={formData.phoneNumber}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="climbing-experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Climbing Experience
                  </label>
                  <div className="mt-1">
                    <select
                      id="climbing-experience"
                      name="climbingExperience"
                      autoComplete="climbing-experience"
                      value={mapCategories(
                        experienceLevels,
                        formData.climbingExperience,
                        "id",
                        "experience_level"
                      )}
                      onChange={handleExperience}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      {experienceLevels &&
                        experienceLevels.map((level) => (
                          <option key={level.id}>{level.experience_level}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="street"
                      id="street-address"
                      autoComplete="street-address"
                      value={formData.street}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                    Post Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="postcode"
                      id="postcode"
                      value={formData.postcode}
                      onChange={handleFormData}
                      autoComplete="postal-code"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      value={formData.country}
                      onChange={handleFormData}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>Australia</option>
                      <option>United States</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                    Profile Photo
                  </label>
                  <UserPhotoUpload formData={formData} handleFormData={handleFormData} />
                </div>
              </div>
              <div className="w-full border-t border-gray-300" />
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={validateForm}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
