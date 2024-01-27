import { useEffect } from 'react';
import { setAccessToken } from './auth';

export const AuthWrapper = () => {
  useEffect(() => {
    setAccessToken();
  }, []);

  return <></>;
};
