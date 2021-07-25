import { postOnboardingForm } from "../../api/ServicesOnboarding";
import { useGlobalState } from "../../utils/globalContext";

export default function UserReview({ formData }) {
  const {
    store: { userProps },
    dispatch,
  } = useGlobalState();

  const handleSubmit = () => {
    postOnboardingForm(dispatch, formData, userProps);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
      <button
        type="submit"
        onClick={handleSubmit}
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Checkout
      </button>
    </div>
  );
}
