// Main dashboard component from which subpages are rendered and managed.
// Dashboard is polymorphic, adapting to the user's role specified by the JWT.
// Links and initial landing page informed by the user role.
// API requests will contain the JWT header so sensitive information is still protected.
// Dashboard redirects to onboarding workflow if user is not an admin and has no profile.

import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
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

export default function Dashboard({ loggedIn, profileComplete, adminAccess }) {
  const { path, url } = useRouteMatch();

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

  if (profileComplete || adminAccess) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <SidebarMobile {...dashboardProps} />
        <Sidebar {...dashboardProps} />
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <Header {...dashboardProps} />
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="h-full px-4 py-6 mx-auto sm:px-6 md:px-8">
              <Route
                path="/dashboard/refresh"
                render={() => <Redirect path="/dashboard" />}
              />
              <Switch>
                <Route path={`${path}/checkins`} render={() => <CheckIns />} />
                <Route path={`${path}/members`} render={() => <Members />} />
                <Route path={`${path}/profile`} render={() => <Profile />} />
                <Route path={`${path}/billing`} render={() => <Billing />} />
                <Route
                  path={path}
                  render={() => <Redirect to={`${path}${initialPage.href}`} />}
                />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    return loggedIn ? <Redirect to="/onboarding" /> : <></>;
  }
}
