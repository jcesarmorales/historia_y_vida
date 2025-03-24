import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BarraNavUser from "../componentes/BarraNavUser";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConsultarPaciente() {
  const [idPaciente, setIdPaciente] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    const u = JSON.parse(localStorage.getItem("user"));
    console.log(u.id);
    if (!t) {
      navigate("/error");
    }
  }, [navigate]);

  const validateIdPaciente = (id) => {
    return id.length >= 7 && id.length <= 11;
  };

  const getOnePaciente = async (idPaciente) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/pacientes/${idPaciente}`
      );
      setPaciente(response.data.data);
      setError("");
      setIdPaciente("");
    } catch (error) {
      console.error("Error al consultar el paciente:", error);
      setError("No se encontró el paciente.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateIdPaciente(idPaciente)) {
      setPaciente(null);
      getOnePaciente(idPaciente);
    } else {
      setError("El número de documento debe tener entre 7 y 11 caracteres.");
    }
  };

  return (
    <>
      <BarraNavUser />
      <div className="fondo">
        <Container fluid="md">
          <Row className="justify-content-md-center pt-5 fondo-2">
            <Col sm={5} className="aling-center">
              <h1 className="T-login">Consulta de paciente</h1>
              <br />
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="consulta"
                  placeholder="Ingrese número de documento"
                  className="me-2"
                  aria-label="Search"
                  value={idPaciente}
                  onChange={(e) => setIdPaciente(e.target.value)}
                />
                <Button variant="outline-success" type="submit">
                  Buscar
                </Button>
              </Form>
            </Col>
          </Row>
          {paciente && (
            <>
              <Row className="justify-content-md-center ps-3">
                <Col sm={4}>
                  <Form.Label>
                    <strong>Nombres: </strong> {paciente.username}
                  </Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Label>
                    <strong>Apellidos: </strong> {paciente.lastName}
                  </Form.Label>
                </Col>
              </Row>
              <Row className="justify-content-md-center ps-3">
                <Col sm={4}>
                  <Form.Label>
                    <strong>Número de documento: </strong> {paciente.idPaciente}
                  </Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Label>
                    <strong>Tipo de documento: </strong> {paciente.tipoDocument}
                  </Form.Label>
                </Col>
              </Row>
              <Row className="justify-content-md-center ps-3">
                <Col sm={4}>
                  <Form.Label>
                    <strong>Fecha de nacimiento: </strong> {paciente.birthdate}
                  </Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Label>
                    <strong>Tipo de sangre: </strong> {paciente.tipoSangre}
                  </Form.Label>
                </Col>
              </Row>
              <Row className="justify-content-md-center ps-3">
                <Col sm={4}>
                  <Form.Label>
                    <strong>Celular: </strong> {paciente.phone}
                  </Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Label>
                    <strong>Dirección: </strong> {paciente.address}
                  </Form.Label>
                </Col>
              </Row>
              <Row className="justify-content-md-center ps-3">
                <Col sm={8}>
                  <Form.Label>
                    <strong>Fecha de Registro: </strong> {paciente.fecha}
                  </Form.Label>
                </Col>
              </Row>
            </>
          )}
          {error && (
            <Row className="justify-content-md-center ps-3">
              <Col sm={6}>
                <Toast
                  onClose={() => setError("")}
                  show={error !== ""}
                  delay={3000}
                  autohide
                >
                  <Toast.Header>
                    <img
                      src="report_FILL0_wght400_GRAD0_opsz48.png"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Alerta</strong>
                  </Toast.Header>
                  <Toast.Body>{error}</Toast.Body>
                </Toast>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}
