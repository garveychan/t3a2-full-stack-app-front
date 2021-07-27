import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const getURL = `${API_URL}/members/show`;
const putURL = `${API_URL}/members/update`;

export function getMemberProfile({ id, token }) {
  return axios
    .get(getURL, { headers: { Authorization: token }, params: { id: id } })
    .then((resp) => {
      return { member: resp.data.member, formQueries: resp.data.formQueries };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function updateMemberProfile(formData, { id, token }) {
  const payload = new FormData();
  payload.append("id", id);

  const profileData = { ...formData };
  payload.append("profileData", JSON.stringify(profileData));

  if (profileData.profilePhoto) {
    const profilePhoto = profileData.profilePhoto;
    payload.append("profilePhoto", profilePhoto);
  }

  return axios
    .put(putURL, payload, { headers: { Authorization: token } })
    .then((_) => {})
    .catch((error) => {
      return Promise.reject(error);
    });
}
