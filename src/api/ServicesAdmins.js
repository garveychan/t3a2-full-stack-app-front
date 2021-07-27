import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const url = `${API_URL}/checkins`;

export function checkIn(email) {
  return axios.post(url, { email }).catch((error) => {
    return Promise.reject(error);
  });
}

export function getCheckIns(userProps) {
  return axios
    .get(url, { headers: { Authorization: userProps.token } })
    .then((resp) => {
      return { newCheckIns: resp.data.checkInList, newMembers: resp.data.members };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
