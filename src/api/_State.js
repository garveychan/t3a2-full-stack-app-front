import jwt_decode from "jwt-decode";

export function setUserProps(dispatch, token = null) {
  const { id, email, profileComplete, role } = jwt_decode(token);
  dispatch({ type: "setUserProps", data: { id, email, profileComplete, role, token } });
}

export function clearUserProps(dispatch) {
  dispatch({
    type: "setUserProps",
    data: { id: null, email: null, profileComplete: null, role: null, token: null },
  });
}
