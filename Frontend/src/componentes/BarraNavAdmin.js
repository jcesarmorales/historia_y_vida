import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
export const BarraNavAdmin = () => {
  const navigate = useNavigate();
  
  function singOut() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div >
        
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
          
          <img
              src="LogoSample_ByTailorBrands-removebg-preview.ico"
              width="60"
              height="30"
              className="d-inline-block align-top"
              alt="historia y vida logo"
            />
            HISTORIA Y VIDA
          
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin"><strong className='st'>Inicio</strong></Nav.Link>
            <Nav.Link href="/signup"> <strong className='st'>Registrar usuario</strong></Nav.Link>
            <Nav.Link href="/infouser"><strong className='st'>Informacion del usuario </strong>
            </Nav.Link>
            <Nav>
            
            <Nav.Link className='st' eventKey={2} href="" onClick={singOut}>
            
              Salir
            </Nav.Link>
          </Nav>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
