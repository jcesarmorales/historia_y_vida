import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "../styles.css";
import { BarraNavAdmin } from "../componentes/BarraNavAdmin";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [tipoDocument, setTipoDocument] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [addressCount, setAddressCount] = useState(0);
  const [phoneCount, setPhoneCount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
    }
  }, [navigate]);

  const resetFields = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
    setId("");
    setTipoDocument("");
    setLastName("");
    setAddress("");
    setPhone("");
    setErrors({});
    setAddressCount(0);
    setPhoneCount(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    if (!validateStringLength(username, 1, 25)) {
      newErrors.username = "El nombre de usuario debe tener entre 1 y 25 caracteres";
      isValid = false;
    }

    if (!validateStringLength(password, 6, 20)) {
      newErrors.password = "La contraseña debe tener entre 6 y 20 caracteres";
      isValid = false;
    }

    if (!validateStringLength(email, 8, 100)) {
      newErrors.email = "El email debe tener entre 8 y 100 caracteres";
      isValid = false;
    }

    if (!validateStringLength(id, 7, 11)) {
      newErrors.id = "El número de documento debe tener entre 7 y 11 caracteres";
      isValid = false;
    }

    if (!validateStringLength(lastName, 1, 25)) {
      newErrors.lastName = "El apellido debe tener entre 1 y 25 caracteres";
      isValid = false;
    }

    if (!validateStringLength(address, 0, 40)) {
      newErrors.address = "La dirección debe tener hasta 40 caracteres";
      isValid = false;
    }

    if (!validatePhoneNumber(phone)) {
      newErrors.phone = "El número de teléfono debe tener 10 dígitos";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      toast.error("Por favor, completa los campos correctamente");
      return;
    }

    let user = {
      id,
      tipoDocument,
      username,
      lastName,
      email,
      password,
      address,
      phone,
      role,
    };

    try {
      const created_user = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        user
      );
      if (created_user) {
        toast.success("Usuario registrado!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            resetFields();
          },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("El usuario ya existe");
      } else {
        toast.error("Falló: " + error.message);
      }
    }
  };

  const validateStringLength = (value, minLength, maxLength) => {
    const length = value.trim().length;
    return length >= minLength && length <= maxLength;
  };

  const validateEmailFormat = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddressCount(e.target.value.length);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneCount(e.target.value.length);
  };

  return (
    <>
      <BarraNavAdmin />
      <div className="fondo">
        <Row className="justify-content-md-center pt-5">
          <ToastContainer />
          <Col lg={6}>
            <h1 className="T-login">REGISTRO DE USUARIO</h1>
            <br></br>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>
                    <strong> Nombres</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={username}
                    name="username"
                    type="username"
                    placeholder="Nombres"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {errors.username && (
                    <Form.Text className="text-danger">{errors.username}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Label>
                    <strong>Apellidos</strong>
                  </Form.Label>
                  <Form.Control
                    value={lastName}
                    name="lastName"
                    type="lastName"
                    placeholder="Apellidos"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {errors.lastName && (
                    <Form.Text className="text-danger">{errors.lastName}</Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridId">
                  <Form.Label>
                    <strong>Numero de documento*</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={id}
                    name="id"
                    type="id"
                    placeholder="Numero de documento"
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                  {errors.id && (
                    <Form.Text className="text-danger">{errors.id}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTipoDocumet">
                  <Form.Label>
                    <strong>Tipo de documento</strong>
                  </Form.Label>
                  <Form.Select
                    value={tipoDocument}
                    defaultValue="Selecciona un tipo de documento"
                    onChange={(e) => setTipoDocument(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un tipo de documento...</option>
                    <option value="Registro civil">Registro civil</option>
                    <option value="Targeta de identidad">
                      Targeta de identidad
                    </option>
                    <option value="Cedula de ciudadania">
                      Cedula de ciudadania
                    </option>
                    <option value="Cedula de extranjeria">
                      Cedula de extranjeria
                    </option>
                    <option value="DNI(Pais de origen)">
                      DNI(Pais de origen)
                    </option>
                    <option value="DNI(Pasaporte)">DNI(pasaporte)</option>
                    <option value="Salvoconducto para refugiado">
                      Salvoconducto para refugiado
                    </option>
                    <option value="Permiso especial de permanencia">
                      Permiso especial de permanencia
                    </option>
                    <option value="Permiso de proteccion temporal">
                      Permiso de proteccion temporal
                    </option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <strong>Email</strong>
                  </Form.Label>
                  <Form.Control
                    value={email}
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <strong>Contraseña</strong>
                  </Form.Label>
                  <Form.Control
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>
                    <strong>Rol</strong>
                  </Form.Label>
                  <Form.Select
                    value={role}
                    defaultValue="Selecciona..."
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>
                    <strong>Direccion</strong>
                  </Form.Label>
                  <Form.Control
                    value={address}
                    name="address"
                    type="address"
                    placeholder="direccion"
                    onChange={handleAddressChange}
                    maxLength={40}
                  />
                  {errors.address && (
                    <Form.Text className="text-danger">{errors.address}</Form.Text>
                  )}
                  {address && (
                    <Form.Text className="text-muted">
                      Caracteres restantes: {40 - addressCount}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>
                    <strong>Celular</strong>
                  </Form.Label>
                  <Form.Control
                    value={phone}
                    name="phone"
                    type="phone"
                    placeholder="Celular"
                    onChange={handlePhoneChange}
                    minLength={10}
                    maxLength={10}
                    required
                  />
                  {errors.phone && (
                    <Form.Text className="text-danger">{errors.phone}</Form.Text>
                  )}
                  {phone && (
                    <Form.Text className="text-muted">
                      Caracteres restantes: {10 - phoneCount}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
