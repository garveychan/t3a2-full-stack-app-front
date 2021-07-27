// Helper functions to access local storage and manipulate the JWT.

const TOKEN_KEY = "session_token";

export function retrieveTokenFromStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveTokenToStorage(token) {
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

export function deleteTokenFromStorage() {
  localStorage.removeItem(TOKEN_KEY);
  return true;
}
