const STOR_NAME = 'user';
let currentUser;

const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;
  const serialisezUser = localStorage.getItem(STOR_NAME);
  if (!serialisezUser) return undefined;
  currentUser = JSON.parse(serialisezUser);
  return currentUser;
};
const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  localStorage.setItem(STOR_NAME, serializedUser);
  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STOR_NAME);
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
