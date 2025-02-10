import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">ESGI Certificates</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/admin">Administration</Nav.Link>
            <Nav.Link as={Link} to="/verify">Vérification</Nav.Link>
            <Nav.Link as={Link} to="/about">À propos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ConnectWallet/>
    </Navbar>
  );
}

export default Header;
