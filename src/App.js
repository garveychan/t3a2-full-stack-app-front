import {getToken} from "./api/Services";
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
      message: "",
      type: null,
    },
    authToken: getToken(),
    profileComplete: false,
    adminAccess: false,
  };

  const [store, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <Main />
    </GlobalContext.Provider>
  );
}
