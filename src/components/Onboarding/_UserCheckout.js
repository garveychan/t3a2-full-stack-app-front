export default function UserCheckout({ nextStep }) {
  return (
    <>
      {/* Stripe Portal Checkout Integration */}
      <button
        type="submit"
        onClick={nextStep}
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Next
      </button>
    </>
  );
}
