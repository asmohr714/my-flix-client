import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../navigation-bar/navigation-bar.scss";

// import { useParams } from "react-router";

export const NavigationBar = ({ user, onLoggedOut }) => {

  return (
    <Navbar bg="dark" data-bs-theme="light" expand="lg" style={{ fontSize: '1.25rem' }} className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '2.5rem', color: '#018fab', fontStyle: 'bold' }}>
          MY FLIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" >
            {!user ? (
              <>
                <Nav.Link style={{ color: '#018fab'}} as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link style={{ color: '#018fab'}} as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Item style={{ flex: 1, marginRight: '50px', color: '#018fab', fontSize: '1.5rem' }}>
                  <span>Welcome, {user.Username}!</span>
                </Nav.Item>
                <Nav.Link style={{ color: '#018fab'}} as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link style={{ color: '#018fab'}} as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link style={{ color: '#018fab'}} as={Link} to="/" onClick={() => onLoggedOut()}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;