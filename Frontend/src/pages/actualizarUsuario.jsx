import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ActualizarUsuario({ confirmacion }) {
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
    }
  }, [navigate]);
  const u = JSON.parse(localStorage.getItem("user"));
  const [username, setUsername] = useState(u.username);
  const [lastName, setLastName] = useState(u.lastName);
  const [email, setEmail] = useState(u.email);
  const [address, setAddress] = useState(u.address);
  const [phone, setPhone] = useState(u.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userUpdated = {
      username: username,
      lastName: lastName,
      email: email,
      address: address,
      phone: phone,
    };
    localStorage.setItem("userUpdated", JSON.stringify(userUpdated));
    try {
      const updated_user = await axios.patch(
        `http://localhost:3000/api/v1/auth/${u.id}`,
        userUpdated
      );
      if (updated_user) {
        toast.success("Datos de usuario actualizados!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        confirmacion(true);
      }
    } catch (error) {
      toast.error("Falló: " + error.message);
    }
  };

  return (
    <div className="fondo">
      <Row className="justify-content-md-center pt-5">
        <ToastContainer />
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>
                  <strong> Nombres</strong>
                </Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridLastname">
                <Form.Label>
                  <strong>Apellidos</strong>
                </Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  <strong>Email</strong>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>
                  <strong>Dirección</strong>
                </Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  placeholder={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>
                  <strong>Celular</strong>
                </Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Row>
            <button type="submit" className="btn btn-primary">
              Guardar cambios
            </button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ActualizarUsuario;
