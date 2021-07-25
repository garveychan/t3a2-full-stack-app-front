import { postOnboardingForm } from "../../api/ServicesOnboarding";
import { useGlobalState } from "../../utils/globalContext";
import { mapCategories } from "./___Helpers";

export default function UserReview({ formData, formQueries: { experienceLevels } }) {
  const {
    store: { userProps },
    dispatch,
  } = useGlobalState();

  const handleSubmit = () => {
    postOnboardingForm(dispatch, formData, userProps);
  };

  const {
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    climbingExperience,
    street,
    city,
    state,
    postcode,
    country,
    profilePhoto,
    waiverName,
    waiverSignatureURI,
    subscriptionType,
  } = formData;

  const imageWrapper = (name, string) => {
    return <img src={string} alt={name} />;
  };

  const profileInfo = [
    { name: "Full Name", value: `${firstName} ${lastName}` },
    { name: "Date of Birth", value: dateOfBirth },
    { name: "Phone Number", value: phoneNumber },
    {
      name: "Climbing Experience",
      value: mapCategories(experienceLevels, climbingExperience, "id", "experience_level"),
    },
    { name: "Full Address", value: `${street}, ${city}, ${state}, ${postcode}, ${country}` },
    {
      name: "Profile Photo",
      value: imageWrapper("Profile Photo", URL.createObjectURL(profilePhoto)),
    },
    { name: "Signature Name", value: waiverName },
    { name: "Signature", value: imageWrapper("Signature", waiverSignatureURI) },
    { name: "Subscription Type", value: subscriptionType },
  ];

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <div className="max-w-md max-h-screen px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="lg:py-24">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
              Profile Review
            </span>
          </h1>
          <div className="bg-white shadow max-h-screen-2/3 overflow-y-scroll rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Profile Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please review your details and ensure they're correct.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {profileInfo.map((info, index) => (
                  <div
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 flex flex-col items-center`}
                  >
                    <dt className="text-sm font-medium text-gray-500">{info.name}</dt>
                    <dd className="w-3/4 mt-3 text-sm text-gray-900 flex justify-center">
                      {info.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="my-4 sm:my-8">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-1/2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
