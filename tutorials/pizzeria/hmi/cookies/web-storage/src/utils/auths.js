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

const clearAuthenticatedUser = async () => {
  localStorage.removeItem(STOR_NAME);
  currentUser = undefined;
  const response = await fetch('api/auths/logout');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
