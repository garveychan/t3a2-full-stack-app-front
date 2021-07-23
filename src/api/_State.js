export function setToken(dispatch, token) {
  dispatch({ type: "setToken", data: token });
}

export function clearToken(dispatch) {
  dispatch({ type: "setToken", data: null });
}

export function setRole(dispatch, role) {
  dispatch({ type: "setRole", data: role });
}

export function clearRole(dispatch) {
  dispatch({ type: "setRole", data: null });
}

export function setProfileComplete(dispatch, bool) {
  dispatch({ type: "setProfileComplete", data: bool})
}

export function clearProfileComplete(dispatch) {
  dispatch({ type: "setProfileComplete", data: null})
}
