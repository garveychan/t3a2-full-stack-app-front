import { Link } from "react-router-dom";
import logo from "../../images/logo_1up.png";

export default function Sidebar({ classNames, url, navLinks, dashboardPage, setDashboardPage }) {
  const handleClick = (_, item) => {
    setDashboardPage(item);
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <Link to="/">
              <span className="sr-only">1UP Bouldering Gym</span>
              <img className="h-8 w-auto sm:h-10" src={logo} alt="1UP Bouldering Gym" />
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              {navLinks.map((item) => (
                <Link
                  to={url + item.href}
                  key={item.name}
                  onClick={(e) => handleClick(e, item)}
                  className={classNames(
                    dashboardPage === item
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      dashboardPage === item ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}