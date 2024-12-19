import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../routes';

const PrivateRoute = () => {
  const { isAuthorized } = useSelector((state) => state.authSlice);

  return isAuthorized
    ? <Outlet />
    : <Navigate to={routes.pages.getLoginPage()} />;
};

export default PrivateRoute;
