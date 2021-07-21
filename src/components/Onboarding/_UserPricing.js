import { CheckIcon } from "@heroicons/react/outline";

const tiers = [
  {
    id: 1,
    name: "Monthly",
    priceMonthly: 99,
    description: "Enjoy flexibility.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
  },
  {
    id: 2,
    name: "Annually",
    priceMonthly: 999,
    description: "Embrace the lifestyle.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
  },
];

export default function UserPricing({ nextStep, prevStep, handleFormData }) {
  const handleClick = (e) => {
    handleFormData({ target: { name: "subscriptionType", value: e.target.getAttribute('pricingId') } });
    nextStep(e)
  };

  return (
    <div className="bg-gray-900 max-h-screen overflow-y-scroll">
      <div className="mt-4 pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
              <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
                How would you like to pay?
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-1 pb-12 sm:mt-2 sm:pb-16 lg:mt-4 lg:pb-24">
        <div className="relative text-left">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
              {tiers.map((tier) => (
                <div key={tier.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <div>
                      <h3
                        className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600"
                        id="tier-standard"
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                      ${tier.priceMonthly}
                      <span className="ml-1 text-2xl font-medium text-gray-500">/mo</span>
                    </div>
                    <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-base text-gray-700">{feature}</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      pricingId={tier.id}
                      onClick={(e) => handleClick(e)}
                      className="box-border items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow text-white bg-green-400 hover:bg-green-500"
                      aria-describedby="tier-standard"
                    >
                      Get started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={prevStep} className="text-white">
          Back (temp button)
        </button>
      </div>
    </div>
  );
}
