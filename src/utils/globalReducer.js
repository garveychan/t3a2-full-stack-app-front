export default function globalReducer(state, action) {
  const { type, data } = action;

  switch (type) {
    case "setNotificationProps": {
      return {
        ...state,
        notificationProps: data
      };
    }
    case "setUserProps": {
      return {
        ...state,
        userProps: data
      }
    }
    default:
      return state;
  }
}
