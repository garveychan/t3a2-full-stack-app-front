import {retrieveTokenFromStorage} from "./api/_Storage";
import React, { useReducer } from "react";
import { GlobalContext } from "./utils/globalContext";
import globalReducer from "./utils/globalReducer";
import Main from "./components/Main";

export default function App() {
  const initialState = {
    notificationProps: {
      status: false,
      timer: 0,
      title: "",
      messages: [],
      type: null,
    },
    authToken: retrieveTokenFromStorage(),
    profileComplete: false,
    role: null,
  };

  const [store, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <Main />
    </GlobalContext.Provider>
  );
}
