import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import { selectIsAuth } from '../../store/slices/authSlice';

const PrivateRoute = () => {
  const isAuthorized = useSelector(selectIsAuth);

  return isAuthorized
    ? <Outlet />
    : <Navigate to={routes.pages.getLoginPage()} />;
};

export default PrivateRoute;
