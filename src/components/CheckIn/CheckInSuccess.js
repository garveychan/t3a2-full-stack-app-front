export default function CheckInSuccess() {
  const USER = "John"

  return (
    <div className="m-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
      <div className="lg:py-24">
        <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
          <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
          Welcome, {USER}!
          </span>
        </h1>
        <h2 className="mt-4 text-2xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-3xl lg:mt-6 xl:text-333">
          We hope you enjoy your visit today.
        </h2>
      </div>
    </div>
  );
}
