// Wrapper for routes requiring authentication.
// Note that authentication is performed by the API,
// this merely redirects based on the existence of a token.
// Requests for private information will still be verified
// by the server when it validates the JWT signature.

import React from "react";
import { Redirect } from "react-router-dom";

export function AuthRoute({ loggedIn }) {
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/" />;
  }
}
