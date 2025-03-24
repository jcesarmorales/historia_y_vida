import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function BarraNavUser() {
  const navigate = useNavigate();
  
  function singOut() {
    localStorage.clear();
    navigate("/");
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='fixed-top '>
      <Container>
        <Navbar.Brand href="/user">
          <img
            src="LogoSample_ByTailorBrands-removebg-preview.ico"
            width="60"
            height="30"
            className="d-inline-block align-top "
            alt="historia y vida logo"
          />
          HISTORIA Y VIDA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Novedades</Nav.Link>
            <Nav.Link href="/infouser">Informacion del usuario
            </Nav.Link>
            <NavDropdown title="Gestion" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/registrar-paciente">Registro de Paciente</NavDropdown.Item>
              <NavDropdown.Item href="/consulta-paciente">Consultar Paciente</NavDropdown.Item>
              <NavDropdown.Item href="/reg-historia-clinica">Registrar Historia Clinica</NavDropdown.Item>
              <NavDropdown.Item href="/cosultar-historia-clinico">Consultar Historias Clinicas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="" onClick={singOut}>
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNavUser;
