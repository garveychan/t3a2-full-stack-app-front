// Placeholder pricing page awaiting business instruction.
// Pricing ID informs Stripe session to be generated for the user.

import { CheckIcon } from "@heroicons/react/outline";

const tiers = [
  {
    id: 1,
    name: "monthly",
    cycle: "/mo",
    price: 99,
    description: "Enjoy flexibility.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
    pricingId: 'price_1KIm5sIjCZg61bceo3qT6295'
  },
  {
    id: 2,
    name: "annually",
    cycle: "/yr",
    price: 999,
    description: "Embrace the lifestyle.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
    pricingId: 'price_1KIm5sIjCZg61bceYcS43Kn8'
  },
];

export default function UserPricing({ nextStep, handleFormData }) {
  const handleClick = (e) => {
    handleFormData({
      target: { name: "subscriptionType", value: e.target.getAttribute("pricingType") },
    });
    handleFormData({
      target: { name: "pricingId", value: e.target.getAttribute("pricingid") },
    });
    nextStep(e);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-900 lg:px-8 lg:overflow-hidden">
      <div className="max-h-screen overflow-y-scroll bg-gray-900">
        <div className="pt-12 mt-4 sm:pt-16 lg:pt-24">
          <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-6xl">
                <span className="block pb-3 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400 lg:mt-0 sm:pb-5">
                  How would you like to pay?
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className="pb-12 mt-1 sm:mt-2 sm:pb-16 lg:mt-4 lg:pb-24">
          <div className="relative text-left">
            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                  >
                    <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                      <div>
                        <h3
                          className="inline-flex px-4 py-1 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-100 rounded-full"
                          id="tier-standard"
                        >
                          {tier.name}
                        </h3>
                      </div>
                      <div className="flex items-baseline mt-4 text-6xl font-extrabold">
                        ${tier.price}
                        <span className="ml-1 text-2xl font-medium text-gray-500">{tier.cycle}</span>
                      </div>
                      <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
                    </div>
                    <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 space-y-6 bg-gray-50 sm:p-10 sm:pt-6">
                      <ul className="space-y-4">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon className="w-6 h-6 text-green-500" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-base text-gray-700">{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <button
                        pricingtype={`$${tier.price} ${tier.name}`}
                        pricingid={tier.pricingId}
                        onClick={handleClick}
                        className="box-border items-center justify-center px-5 py-3 text-base font-medium text-white bg-green-400 border border-transparent rounded-md shadow hover:bg-green-500 disabled:bg-green-400 disabled:cursor-default"
                        aria-describedby="tier-standard"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
