import React from "react";
import { Redirect } from "react-router-dom";

export function AuthRoute({ loggedIn }) {
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/" />;
  }
}
