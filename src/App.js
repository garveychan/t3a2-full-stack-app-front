import { retrieveTokenFromStorage } from "./api/_Storage";
import React, { useEffect, useReducer } from "react";
import { GlobalContext } from "./utils/globalContext";
import globalReducer from "./utils/globalReducer";
import Main from "./components/Main";
import jwt_decode from "jwt-decode";
import { clearUserProps, setUserProps } from "./api/_State";

export default function App() {
  const authToken = retrieveTokenFromStorage();
  let [id, email, profileComplete, role] = [null, null, null, null];

  console.log(jwt_decode(authToken))
  if (authToken) ({ id, email, profileComplete, role } = jwt_decode(authToken));

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
      authToken: authToken,
    },
  };

  const [store, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    authToken
      ? setUserProps(dispatch, id, email, profileComplete, role, authToken)
      : clearUserProps(dispatch);
  }, [authToken, email, id, profileComplete, role]);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <Main />
    </GlobalContext.Provider>
  );
}
