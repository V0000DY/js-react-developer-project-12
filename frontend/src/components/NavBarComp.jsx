import React from 'react';
import {
  Navbar,
  Button,
  Container,
} from 'react-bootstrap';

const TopLine = () => (
  <Navbar className="shadow-sm navbar-expand-lg bg-white">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      <Button>Выйти</Button>
    </Container>
  </Navbar>
);

export default TopLine;
