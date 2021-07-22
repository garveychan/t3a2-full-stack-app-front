export default function globalReducer(state, action) {
  const { type, data: data } = action;

  switch (type) {
    case "setNotificationProps": {
      return {
        ...state,
        notificationProps: data
      };
    }
    default:
      return state;
  }
}
