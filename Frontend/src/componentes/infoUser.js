import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import BarraNavUser from "../componentes/BarraNavUser";
import ActualizarUsuario from "../pages/actualizarUsuario";
import { BarraNavAdmin } from "./BarraNavAdmin";

function InfoUser() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [confirmacion, setConfirmacion] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
    }
  }, [navigate]);

  const u = JSON.parse(localStorage.getItem("user"));
  const uc = JSON.parse(localStorage.getItem("userUpdated"));

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  const actualizarLabel = useCallback(() => {
    const updatedUser = {
      ...u,
      username: uc.username,
      lastName: uc.lastName,
      email: uc.email,
      address: uc.address,
      phone: uc.phone
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }, [u, uc]);

  const recibirConfirmacion = useCallback((confirmacion) => {
    setConfirmacion(confirmacion);
  }, []);

  useEffect(() => {
    if (confirmacion) {
      actualizarLabel();
      handleCloseModal();
      setConfirmacion(false);
    }
  }, [confirmacion, actualizarLabel]);

  return (
    <>
      {u.role === "user" ? <BarraNavUser /> : <BarraNavAdmin />}
      <div className="fondo">
        <Container fluid="md">
          <Row className="justify-content-md-center pt-5 fondo-2">
            <h1 className="T-login mb-4">Informacion del usuario</h1>
            <Row className="justify-content-md-start ps-3">
              <Col sm={4}>
                <Form.Label>
                  <strong>Nombres: </strong> {u.username}
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Label>
                  <strong>Apellidos: </strong> {u.lastName}
                </Form.Label>
              </Col>
            </Row>
            <Row className="justify-content-md-start ps-3">
              <Col sm={4}>
                <Form.Label>
                  <strong>Número de documento: </strong> {u.id}
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Label>
                  <strong>Correo: </strong> {u.email}
                </Form.Label>
              </Col>
            </Row>
            <Row className="justify-content-md-start ps-3">
              <Col sm={4}>
                <Form.Label>
                  <strong>Celular: </strong> {u.phone}
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Label>
                  <strong>Dirección: </strong> {u.address}
                </Form.Label>
              </Col>
            </Row>
            <Row className="justify-content-md-start ps-3 mt-4">
              <Col sm={4} className="d-flex justify-content-start">
                <Button variant="primary" onClick={handleOpenModal}>
                  Modificar
                </Button>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong className="T-login">ACTUALIZAR DATOS DEL USUARIO</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActualizarUsuario confirmacion={recibirConfirmacion} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoUser;
