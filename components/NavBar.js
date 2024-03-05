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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>WATCH PARTY</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {/* <Link passHref href={`/profile/${user.username}`}>
              <Nav.Link>Profile</Nav.Link>
            </Link> */}
            <Link passHref href={`/profile/${user.username}`}>
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link passHref href="/shows">
              <Nav.Link>Your Shows</Nav.Link>
            </Link>
            <Link passHref href="/parties">
              <Nav.Link>All Parties</Nav.Link>
            </Link>
            <Link passHref href="/community">
              <Nav.Link>Community</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
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
