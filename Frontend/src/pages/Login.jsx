import axios from "axios";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BarraNav } from "../componentes/BarraNav";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = { email, password };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        credentials
      );
      const user = {
        id: res.data.data.userId,
        username: res.data.data.username,
        lastName: res.data.data.lastName,
        address: res.data.data.address,
        phone: res.data.data.phone,
        email: res.data.data.email,
        role: res.data.data.userRole,
        token: res.data.data.token,
      };
      localStorage.setItem("jwt-token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage.getItem("user"));
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Correo o contraseña incorrecta");
      } else {
        toast.error("Falló: " + error.message);
      }
    }
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) && value.length >= 8 && value.length <= 100;
  };

  const validatePassword = (value) => {
    return value.length >= 6 && value.length <= 20;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      e.target.setCustomValidity(
        "El correo debe tener entre 8 y 100 caracteres y tener un formato válido."
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      e.target.setCustomValidity(
        "La contraseña debe tener entre 6 y 20 caracteres."
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <>
      <BarraNav />
      <div className="">
        <h1 className="T-login">Login</h1>
      </div>

      <Row className="justify-content-md-center pt-5 ">
        <ToastContainer />
        <Col lg={3} md={3}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <strong>Correo</strong>
              </Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                El correo debe tener entre 8 y 100 caracteres y tener un formato válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Contraseña</strong>
              </Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Contraseña"
                onChange={handlePasswordChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener entre 6 y 20 caracteres.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
