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
    case "setResetToken": {
      return {
        ...state,
        resetToken: data
      }
    }
    default:
      return state;
  }
}
