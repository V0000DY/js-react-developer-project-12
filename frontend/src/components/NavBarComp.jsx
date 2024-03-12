/* eslint-disable functional/no-expression-statements */
import React from 'react';
import {
  Navbar,
  Button,
  Container,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

const TopLine = () => {
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
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {userId && <Button onClick={onLogOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default TopLine;
