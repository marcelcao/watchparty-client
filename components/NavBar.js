/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { signOut } from '../utils/auth';

export default function NavBar({ user }) {
  return (
    <Navbar collapseOnSelect expand="lg" id="nav">
      <Container className="nav">
        <Link passHref href="/">
          <Navbar.Brand>
            <img src="/wplogo.png" alt="Watch Party Logo" className="nav-logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-items">
            <Nav className="links">
              <Link passHref href={`/profile/${user.username}`}>
                <Nav.Link id="navlink">Profile</Nav.Link>
              </Link>
              <Link passHref href="/shows">
                <Nav.Link id="navlink">Your Shows</Nav.Link>
              </Link>
              <Link passHref href="/parties">
                <Nav.Link id="navlink">All Parties</Nav.Link>
              </Link>
              <Link passHref href="/community">
                <Nav.Link id="navlink">Community</Nav.Link>
              </Link>
            </Nav>
            <Nav className="sign-out-container">
              <Button className="sign-out-btn" onClick={signOut}>
                Sign Out
              </Button>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};
