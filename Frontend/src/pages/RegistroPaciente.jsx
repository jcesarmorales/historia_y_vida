import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";
import { useNavigate } from "react-router-dom";

import BarraNavUser from "../componentes/BarraNavUser";

export default function RegistroPaciente() {
  const [idPaciente, setidPaciente] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [tipoSangre, setTipoSangre] = useState("");
  const [tipoDocument, setTipoDocument] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
      
    }
  }, [navigate]);

  const resetFields = () => {
    setUsername("");
    setidPaciente("");
    setBirthdate(null);
    setTipoSangre("");
    setTipoDocument("");
    setLastName("");
    setAddress("");
    setPhone("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let paciente = {
      tipoDocument,
      username,
      lastName,
      idPaciente,
      birthdate:new Date(birthdate).toLocaleDateString(),
      tipoSangre,
      address,
      phone,
    };
    try {
      const created_paciente = await axios.post(
        "http://localhost:3000/api/v1/pacientes",
        paciente
      );
      if (created_paciente) {
        toast.success("Paciente registrado!", {
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
      toast.error("Falló: " + error.message);
    }
  };

  return (
    <>
      <BarraNavUser />
      <div className="fondo">
        <Row className="justify-content-md-center pt-5">
          <ToastContainer />
          <Col lg={6}>
            <h1 className="T-login">REGISTRO DE PACIENTE</h1>
            <br />
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>
                    <strong>Nombres</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={username}
                    name="username"
                    type="username"
                    placeholder="Nombres"
                    onChange={(e) => setUsername(e.target.value)}
                  />
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
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridIdPaciente">
                  <Form.Label>
                    <strong>Numero de documento*</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={idPaciente}
                    name="idPaciente"
                    type="idPaciente"
                    placeholder="Numero de documento"
                    onChange={(e) => setidPaciente(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTipoDocumet">
                  <Form.Label>
                    <strong>Tipo de documento</strong>
                  </Form.Label>
                  <Form.Select
                    value={tipoDocument}
                    defaultValue={null}
                    placeholder="Seleccione un tipo de documento"
                    onChange={(e) => setTipoDocument(e.target.value)}
                  >
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
                <Form.Group as={Col} controlId="formGridBirthdate">
                  <Form.Label>
                    <strong>Fecha de nacimiento</strong>
                  </Form.Label>
                  <DatePicker
                    selected={birthdate}
                    onChange={(date) => setBirthdate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="dd/mm/aaaa"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    minDate={new Date("01/01/1901")}
                    maxDate={new Date()}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTipoSangre">
                  <Form.Label>
                    <strong>Tipo de sangre</strong>
                  </Form.Label>
                  <Form.Select
                    value={tipoSangre}
                    defaultValue="Selecciona un tipo de sangre..."
                    onChange={(e) => setTipoSangre(e.target.value)}
                  >
                    <option value="">Selecciona un tipo de sangre...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>
                    <strong>Dirección</strong>
                  </Form.Label>
                  <Form.Control
                    value={address}
                    name="address"
                    type="address"
                    placeholder="Dirección"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>
                    <strong>Teléfono</strong>
                  </Form.Label>
                  <Form.Control
                    value={phone}
                    name="phone"
                    type="phone"
                    placeholder="Teléfono"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Registrar
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
