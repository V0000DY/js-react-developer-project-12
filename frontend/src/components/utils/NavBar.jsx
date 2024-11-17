import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Navbar,
  Stack,
} from 'react-bootstrap';
import { memo } from 'react';
import useAuth from '../../hooks/index.jsx';

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userId'));

  const onLogOut = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm navbar-expand-lg bg-white">
      <Container>
        <Navbar.Brand href="/">Simple Chat</Navbar.Brand>
        <Stack direction="horizontal" gap={3}>
          {userId && <Button onClick={onLogOut}>Выйти</Button>}
        </Stack>
      </Container>
    </Navbar>
  );
};

export default memo(NavBar);
