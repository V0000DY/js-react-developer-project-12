import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Navbar,
  Stack,
} from 'react-bootstrap';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/index.jsx';

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userId = JSON.parse(localStorage.getItem('userId'));

  const onLogOut = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm navbar-expand-lg bg-white">
      <Container>
        <Navbar.Brand href="/">{t('navBarComp.title')}</Navbar.Brand>
        <Stack direction="horizontal" gap={3}>
          {userId && <Button onClick={onLogOut}>{t('navBarComp.logOutButton')}</Button>}
        </Stack>
      </Container>
    </Navbar>
  );
};

export default memo(NavBar);
