import { useGlobalState } from "../../utils/globalContext";
import { useState, useMemo, useEffect, useCallback } from "react";
import { getMemberProfile } from "../../api/ServicesMembers";
import { displayNotification } from "../_Notification";
import { mapCategories } from "../Onboarding/___Helpers";
import UserPhotoUpload from "../Onboarding/__UserPhotoUpload";

export default function Profile() {
  const {
    store: { userProps },
    dispatch,
  } = useGlobalState();

  const initialProfileCard = {
    image: "",
    name: "",
    email: "",
    streetAddress: "",
    townAddress: "",
    dateOfBirth: "",
    waiverStatus: true,
    climbingExperience: 1,
  };

  const initialFormQueries = {
    experienceLevels: [],
  };

  const memoizedInitialFormData = useMemo(() => {
    return {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      climbingExperience: 1,
      street: "",
      city: "",
      state: "",
      postcode: "",
      country: "Australia",
      profilePhoto: null,
    };
  }, []);

  const [profileCard, setProfileCard] = useState(initialProfileCard);
  const [formQueries, setFormQueries] = useState(initialFormQueries);
  const [formData, setFormData] = useState(memoizedInitialFormData);

  const { experienceLevels } = formQueries;

  const prepareMemberProfile = useCallback(() => {
    const updateForm = (formData, member) => {
      const {
        user: { email },
        profile: { first_name, last_name, date_of_birth, phone_number, experience_level_id },
        address: { street_address, city, state, postcode, country },
        photo,
        waiver,
      } = member;

      setProfileCard({
        image: photo,
        name: `${first_name} ${last_name}`,
        email: email,
        streetAddress: `${street_address}, ${city}`,
        townAddress: `${state} ${postcode} ${country}`,
        dateOfBirth: date_of_birth,
        waiverStatus: !!waiver,
        climbingExperience: mapCategories(
          experienceLevels,
          experience_level_id,
          "experience_level",
          "id"
        ).toString(),
      });
    };

    const setForm = (formQueries) => {
      const {experienceLevels} = formQueries;
      setFormQueries({ experienceLevels: experienceLevels });
    };

    getMemberProfile(userProps)
      .then(({ member, formQueries }) => {
        setForm(formQueries);

        updateForm(formData, member);
      })
      .catch((_) => {
        displayNotification(
          dispatch,
          3000,
          "error",
          "Sorry, something went wrong.",
          "We couldn't retrieve your profile details.",
          "Please refresh your page or try again later."
        );
      });
  }, [dispatch, userProps, experienceLevels, formData]);

  useEffect(() => {
    prepareMemberProfile();
  }, [prepareMemberProfile]);

  const handleFormData = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleExperience = (e) => {
    const mappedExperience = {
      target: {
        name: "climbingExperience",
        value: mapCategories(experienceLevels, e.target.value, "experience_level", "id").toString(),
      },
    };
    handleFormData(mappedExperience);
  };

  return (
    <>
      <form className="space-y-8 divide-y divide-gray-200" autoComplete="off">
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-lg">
            <div className="justify-between items-center flex flex-col lg:flex-row">
              <div className="w-3/4 lg:w-1/2 flex justify-center">
                <img
                  className="h-60 w-60 object-cover rounded-full"
                  src={profileCard.image}
                  alt=""
                />
              </div>
              <dl className="mt-4 lg:mt-0 w-2/3 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:text-left text-center">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileCard.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileCard.dateOfBirth}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileCard.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Waiver Status</dt>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profileCard.waiverStatus
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {profileCard.waiverStatus ? "Signed" : "Not Signed"}
                  </span>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {profileCard.streetAddress}, {profileCard.townAddress}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Experience Level</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileCard.climbingExperience}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Credentials</h3>
              <p className="mt-1 text-sm text-gray-500">
                Leave your password blank if you do not wish to make changes to it.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={handleFormData}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleFormData}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    onChange={handleFormData}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please update your details below if required.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
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
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                We'll always let you know about important changes, but you pick what else you want
                to hear about.
              </p>
            </div>
            <div className="mt-6">
              <fieldset>
                <legend className="text-base font-medium text-gray-900">By Email</legend>
                <div className="mt-4 space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="offers" className="font-medium text-gray-700">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when we have new offers.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <div>
                  <legend className="text-base font-medium text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="text-sm text-gray-500">
                    These are delivered via SMS to your mobile phone.
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-everything"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-email"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
