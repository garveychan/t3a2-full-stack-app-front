import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const url = `${API_URL}/checkins`;

export function checkIn(email) {
  return axios.post(url, { email }).catch((error) => {
    return Promise.reject(error);
  });
}

// export function retrieveCheckIns(dispatch, email, password) {
//   return axios
//     .post(url, { user: { email, password } })
//     .then((resp) => {
//       const token = resp.headers.authorization;
//       saveTokenToStorage(token);
//       setUserProps(dispatch, token);
//     })
//     .then((_) => {
//       displayNotification(
//         dispatch,
//         3000,
//         "success",
//         "Welcome!",
//         "Your account was successfully created."
//       );
//     })
//     .catch((error) => {
//       displayNotification(
//         dispatch,
//         3000,
//         "error",
//         "Sorry, the following error(s) occurred.",
//         error.response.data.error
//       );
//       return Promise.reject(error);
//     });
// }
