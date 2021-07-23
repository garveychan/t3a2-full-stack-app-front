import { retrieveTokenFromStorage } from "./api/_Storage";
import React, { useReducer } from "react";
import { GlobalContext } from "./utils/globalContext";
import globalReducer from "./utils/globalReducer";
import Main from "./components/Main";
import jwt_decode from "jwt-decode";
import {BrowserRouter as Router} from "react-router-dom"

export default function App() {
  let token = retrieveTokenFromStorage();
  let [id, email, profileComplete, role] = [null, null, null, null];
  if (token) ({ id, email, profileComplete, role } = jwt_decode(token));

  const initialState = {
    notificationProps: {
      status: false,
      timer: 0,
      title: "",
      messages: [],
      type: null,
    },
    userProps: {
      id: id,
      email: email,
      profileComplete: profileComplete,
      role: role,
      token: token,
    },
  };

  const [store, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <Router>
        <Main />
      </Router>
    </GlobalContext.Provider>
  );
}
