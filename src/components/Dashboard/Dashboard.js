import { useRouteMatch, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./_Header";
import CheckIns from "./_CheckIns";
import Members from "./_Members";
import Profile from "./_Profile";
import Billing from "./_Billing";
import Sidebar from "./_Sidebar";
import SidebarMobile from "./_SidebarMobile";
import {
  IdentificationIcon,
  UsersIcon,
  UserCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";

export default function Dashboard({ role }) {
  const { path, url } = useRouteMatch();

  const navigation = {
    checkins: {
      name: "Check-ins",
      href: "/checkins",
      icon: IdentificationIcon,
      adminRequired: true,
    },
    members: {
      name: "Members",
      href: "/members",
      icon: UsersIcon,
      adminRequired: true,
    },
    profile: {
      name: "Edit Profile",
      href: "/profile",
      icon: UserCircleIcon,
      adminRequired: false,
    },
    billing: {
      name: "Billing Portal",
      href: "/billing",
      icon: CreditCardIcon,
      adminRequired: false,
    },
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const adminAccess = role === "admin";

  const initialState = () => {
    let [landingPage, navLinks] = [null, []];
    for (const page in navigation) {
      if (navigation[page].adminRequired === adminAccess) {
        if (!landingPage) landingPage = navigation[page];
        navLinks.push(navigation[page]);
      }
    }
    return {
      initialPage: landingPage,
      initialLinks: navLinks,
    };
  };

  const { initialPage, initialLinks } = initialState();
  const [dashboardPage, setDashboardPage] = useState(initialPage);
  const [navLinks] = useState(initialLinks);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
