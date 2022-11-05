const STORE_NAME = 'user';
const REMEMBER_ME='Remember'
let currentUser;

const getRememberMe=()=>{
  const rememberbe= localStorage.getItem(REMEMBER_ME);
  return JSON.parse(rememberbe);
}
const setRememberMe=(remember)=>{
  const rememberSession=JSON.parse(remember);
  localStorage.setItem(REMEMBER_ME,rememberSession)
}
const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;

  const serializedUser = localStorage.getItem(STORE_NAME);
  if (!serializedUser) return undefined;

  currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  const remember=getRememberMe();
  if(remember)
  localStorage.setItem(STORE_NAME, serializedUser);

  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STORE_NAME);
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser,setRememberMe,getRememberMe };
