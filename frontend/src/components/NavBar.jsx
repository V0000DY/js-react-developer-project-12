import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Navbar,
  Stack,
} from 'react-bootstrap';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectIsAuth } from '../store/slices/authSlice.js';
import routes from '../routes.js';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthorized = useSelector(selectIsAuth);

  const onLogOut = () => {
    dispatch(logOut());
    navigate(routes.pages.getLoginPage());
  };

  return (
    <Navbar className="shadow-sm navbar-expand-lg bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.pages.getChatPage()}>{t('navBarComp.title')}</Navbar.Brand>
        <Stack direction="horizontal" gap={3}>
          {isAuthorized && <Button onClick={onLogOut}>{t('navBarComp.logOutButton')}</Button>}
        </Stack>
      </Container>
    </Navbar>
  );
};

export default memo(NavBar);
