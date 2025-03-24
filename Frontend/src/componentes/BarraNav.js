import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
export const BarraNav = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="LogoSample_ByTailorBrands-removebg-preview.ico"
              width="70"
              height="60"
              className="d-inline-block align-center"
              alt="historia y vida logo"
            />
            HISTORIA Y VIDA
          </Navbar.Brand>
          <Nav className="nav navbar-nav navbar-right">
            <Nav.Link href="/"><strong className="st ">Inicio</strong></Nav.Link>
            <Nav.Link href="/mision"><strong className="st ">Mision</strong></Nav.Link>
            <Nav.Link href="/vision"><strong className="st ">Vision</strong></Nav.Link>
            <Nav.Link href="/Login">
              <strong className="st">Login</strong>

              <img
                src="login_enter_icon_249942.ico"
                width="20"
                height="20"
                className="d-inline-block align-center"
                alt="historia y vida logo"
              />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
