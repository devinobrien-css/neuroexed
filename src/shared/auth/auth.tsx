import { LoaderFunction, redirect } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';

/** Sets the access token in local and session storage
 */
export const setAccessToken = async () => {
  const { tokens } = await fetchAuthSession({ forceRefresh: true });
  if (tokens?.accessToken) {
    localStorage.setItem('accessToken', tokens.accessToken.toString());
    sessionStorage.setItem('accessToken', tokens.accessToken.toString());
  }
};

/** Returns the access token from local or session storage
 */
export const getAccessToken = () => {
  return (
    localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken')
  );
};

/** Removes the access token from local and session storage
 */
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('accessToken');
  redirect('/');
  // window.location.reload();
};

/** Redirects to the home page if the user is not authenticated
 */
export const redirectIfUnauthenticated: LoaderFunction = () => {
  if (!getAccessToken()) {
    redirect('/');
  }
  return null;
};
