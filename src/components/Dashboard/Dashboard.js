import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IdentificationIcon,
  UsersIcon,
  UserCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";
import Header from "./_Header";
import CheckIns from "./_CheckIns";
import Members from "./_Members";
import Profile from "./_Profile";
import Billing from "./_Billing";
import Sidebar from "./_Sidebar";
import SidebarMobile from "./_SidebarMobile";

export default function Dashboard() {
  const { path, url } = useRouteMatch();

  const navigation = {
    checkins: {
      name: "Check-ins",
      href: "/checkins",
      icon: IdentificationIcon,
      adminRequired: true,
      current: true,
    },
    members: {
      name: "Members",
      href: "/members",
      icon: UsersIcon,
      adminRequired: true,
      current: false,
    },
    profile: {
      name: "Edit Profile",
      href: "/profile",
      icon: UserCircleIcon,
      adminRequired: false,
      current: false,
    },
    billing: {
      name: "Billing Portal",
      href: "/billing",
      icon: CreditCardIcon,
      adminRequired: false,
      current: false,
    },
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // adminStatus to be pulled from API
  const [adminStatus, setAdminStatus] = useState(true);
  const [navLinks, setNavLinks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardPage, setDashboardPage] = useState("");

  useEffect(() => {
    setNavLinks([]);
    for (const page in navigation) {
      if (navigation[page].adminRequired === adminStatus) {
        setNavLinks((prevLinks) => [...prevLinks, navigation[page]]);
      }
    }
  }, []);

  const dashboardProps = {
    sidebarOpen,
    setSidebarOpen,
    classNames,
    dashboardPage,
    setDashboardPage,
    navLinks,
    url,
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <SidebarMobile {...dashboardProps} />
      <Sidebar {...dashboardProps} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header {...dashboardProps} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Switch>
                <Route path={`${path}/checkins`} render={() => <CheckIns />} />
                <Route path={`${path}/members`} render={() => <Members />} />
                <Route path={`${path}/profile`} render={() => <Profile />} />
                <Route path={`${path}/billing`} render={() => <Billing />} />
              </Switch>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
