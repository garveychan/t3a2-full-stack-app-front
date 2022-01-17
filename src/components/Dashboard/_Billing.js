// Member billing portal to be implemented with Stripe.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConstruction } from "@fortawesome/pro-duotone-svg-icons";

export default function Billing() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon
          icon={faConstruction}
          className="m-3 text-yellow-600 text-9xl"
        />
        <span className="text-xl">This feature is under construction.</span>
        <span className="text-xl">Stay tuned!</span>
      </div>
    </>
  );
}
