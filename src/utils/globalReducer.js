export default function globalReducer(state, action) {
  const { type, data } = action;

  switch (type) {
    case "setNotificationProps": {
      return {
        ...state,
        notificationProps: data
      };
    }
    case "setToken" : {
      return {
        ...state,
        authToken: data
      }
    }
    default:
      return state;
  }
}
