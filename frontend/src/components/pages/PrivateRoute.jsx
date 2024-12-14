import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import useAuth from '../../hooks';
import routes from '../../routes';

const PrivateRoute = () => {
  const { isAuthorized } = useAuth();

  return isAuthorized
    ? <Outlet />
    : <Navigate to={routes.pages.loginPage()} />;
};

export default PrivateRoute;
