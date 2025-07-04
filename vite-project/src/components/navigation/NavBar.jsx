import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/NarBar.css";
import TokenManager from "../../api/TokenManager";

function CustomNavbar() {
  const navigate = useNavigate();

  const isLoggedIn = TokenManager.getAccessToken();

  const logOut = () => {
    TokenManager.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="link-space" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="link-space" as={Link} to="/search-flights">Book a Flight</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {isLoggedIn ? ( // Shows dropdown only if the user is logged in
          <Dropdown align="end">
            <Dropdown.Toggle className="text-light small-text" variant="link">
              My Account
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : ( // Show only a link when the user is not logged in
          <Nav.Link className="text-light small-text" as={Link} to="/login">
            My Account
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;