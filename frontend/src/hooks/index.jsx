import { useContext } from 'react';
import AuthContext from '../context';

const useAuth = () => {
  const auth = useContext(AuthContext);

  const isAuthorized = auth.loggedIn;

  return { isAuthorized, auth };
};

export default useAuth;
