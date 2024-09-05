import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {userServices} from '../services/user.services';


export function ClientHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand href="/recipes">Healthy Eating</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <NavDropdown title={localStorage.getItem('userName')} id="basic-nav-dropdown">
              <NavDropdown.Item href="/underConstruction">Contact</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Security</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Other</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={userServices.logout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
