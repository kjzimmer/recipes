import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {allServices} from '../services/services';


export function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Master Chef</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/recipes/">Recipes</Nav.Link>
            <Nav.Link href="/recipes/add/">Add Recipe</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/underConstruction">Contact</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Security</NavDropdown.Item>
              <NavDropdown.Item href="/underConstruction">Other</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={allServices.logout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
