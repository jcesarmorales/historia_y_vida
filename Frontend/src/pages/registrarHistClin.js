import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import BarraNavUser from "../componentes/BarraNavUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


export default function RegistrarHistoriaClinica() {
  const [paciente, setPaciente] = useState(null);
  const [idPaciente, setIdPaciente] = useState("");
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [error, setError] = useState("");

  const [nombre_paciente, setNombre_paciente] = useState(null);
  const [edad, setEdad] = useState(null);
  const [lugar_nacimiento, setLugar_nacimiento] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [lugar_procedencia, setLugar_procedencia] = useState(null);
  const [instruccion, setInstruccion] = useState(null);
  const [fecha_ingreso, setFecha_ingreso] = useState(null);
  const [fecha_salida, setFecha_salida] = useState(null);
  const [estado_civil, setEstado_civil] = useState(null);
  const [acompanante_responsable, setAcompanante_responsable] = useState(null);
  const [establecimiento_referencia, setEstablecimiento_referencia] =
    useState(null);
  const [informantes, setInformantes] = useState(null);
  const [información_confiable, setInformacion_confiable] = useState(null);
  const [motivo_ingreso, setMotivo_ingreso] = useState(null);
  const [inmunizacion, setInmunizacion] = useState(null);
  const [antecedentes, setAntecedente] = useState(null);
  const [alergias, setAlergias] = useState(null);
  const [medicamento_resetado, setMedicamento_resetado] = useState(null);
  const [id_medico, setId_medico] = useState(null);
  const [nombre_medico, setNombre_medico] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
      
    }
  }, [navigate]);

  const getOnePaciente = async (idPaciente) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/pacientes/${idPaciente}`
      );
      setPaciente(response.data.data);
      setError("");
      setIdPaciente("");
      setFormularioAbierto(true);
    } catch (error) {
      console.error("Error al consultar el paciente:", error);
      setIdPaciente("");
      toast.error("No se encontró el paciente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idPaciente) {
      setPaciente(null);
      getOnePaciente(idPaciente);
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    console.log("Entro al guardado");
    let historiaClinica = {
      idPaciente: paciente.idPaciente,
      nombre_paciente: paciente.username + " " + paciente.lastName,
      edad,
      lugar_nacimiento,
      sexo,
      lugar_procedencia,
      instruccion,
      fecha_ingreso: new Date(fecha_ingreso).toLocaleString("es-ES", {
        timeZone: "America/Bogota",
      }),
      fecha_salida: new Date(fecha_salida).toLocaleString("es-ES", {
        timeZone: "America/Bogota",
      }),
      estado_civil,
      acompanante_responsable,
      establecimiento_referencia,
      informantes,
      información_confiable,
      motivo_ingreso,
      inmunizacion,
      antecedentes,
      alergias,
      medicamento_resetado,
      id_medico,
      nombre_medico,
      comentarios,
    };

    try {
      console.log(historiaClinica);
      const created_HistClin = await axios.post(
        "http://localhost:3000/api/v1/HistoriasClinicas/",
        historiaClinica
      );
      console.log(created_HistClin);
      if (created_HistClin) {
        resetFields();
        toast.success("Historia registrada!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        });
      }
    } catch (error) {
      toast.error("Falló: " + error.message);
    }
  };
  const handleClick = () => {
    resetFields();
    setFormularioAbierto(false);
  };

  const resetFields = () => {
    setIdPaciente(null);
    setNombre_paciente(null);
    setEdad(null);
    setLugar_nacimiento(null);
    setSexo(null);
    setLugar_procedencia(null);
    setInstruccion(null);
    setFecha_ingreso(null);
    setFecha_salida(null);
    setEstado_civil(null);
    setAcompanante_responsable(null);
    setEstablecimiento_referencia(null);
    setInformantes(null);
    setInformacion_confiable(null);
    setMotivo_ingreso(null);
    setInmunizacion(null);
    setAntecedente(null);
    setAlergias(null);
    setMedicamento_resetado(null);
    setId_medico(null);
    setNombre_medico(null);
    setComentarios(null);
    setFormularioAbierto(false);
  };

  return (
    <>
      <BarraNavUser />
      <div className="fondo pt-5">
        <ToastContainer />
        <Form onSubmit={handleSubmit}>
          {!formularioAbierto && (
            <Form.Group
              as={Row}
              className="pt-5"
              controlId="formGridIdPaciente"
            >
              <Form.Label column sm={2}>
                Numero de documento:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  value={idPaciente}
                  placeholder="Ingrese numero de documento"
                  onChange={(e) => setIdPaciente(e.target.value)}
                />
              </Col>
              <Col sm={2}>
                <Button variant="primary" type="submit">
                  Buscar Paciente
                </Button>
              </Col>
            </Form.Group>
          )}
          {error && <p>{error}</p>}
        </Form>
        {formularioAbierto && (
          <Form onSubmit={handleSubmitReg}>
            <h1 className="T-login">REGISTRO DE HISTORIA CLINICA</h1>
            <Row className="mb-3 pt-5">
              
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridNombre_paciente">
                  <Form.Label>
                    <strong>Nombre del paciente</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    disabled
                    value={nombre_paciente}
                    name="nombre_paciente"
                    type="nombre_paciente"
                    placeholder={`${
                      paciente.username + " " + paciente.lastName
                    }`}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridIdPaciente">
                  <Form.Label>
                    <strong>Numero de documento*</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    disabled
                    value={idPaciente}
                    name="idPaciente"
                    type="idPaciente"
                    placeholder={`${paciente.idPaciente}`}
                    
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridNombre_medico">
                  <Form.Label>
                    <strong>Nombre del medico</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    
                    value={nombre_medico}
                    name="nombre_medico"
                    type="nombre_medico"
                    placeholder={"Ingrese el nombre del medico"}
                    onChange={(e) => setNombre_medico(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridIdMedico">
                  <Form.Label>
                    <strong>Numero de documento del medico*</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    
                    value={id_medico}
                    name="id_medico"
                    type="id_medico"
                    placeholder={" ingrese el numero de documento del medico"}
                    onChange={(e) => setId_medico(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEdad">
                  <Form.Label>
                    <strong>Edad</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={edad}
                    name="edad"
                    type="edad"
                    placeholder="edad"
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLugar_nacimiento">
                  <Form.Label>
                    <strong>Lugar de nacimiento</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={lugar_nacimiento}
                    name="lugar_nacimiento"
                    type="lugar_nacimiento"
                    placeholder="Lugar de nacimiento"
                    onChange={(e) => setLugar_nacimiento(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLugar_procedencia">
                  <Form.Label>
                    <strong>Lugar de procedencia</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={lugar_procedencia}
                    name="lugar_procedencia"
                    type="lugar_procedencia"
                    placeholder="Lugar de procedencia"
                    onChange={(e) => setLugar_procedencia(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form>
                    <Form.Label>
                      <strong>Sexo</strong>{" "}
                    </Form.Label>
                    {["radio"].map((sexo) => (
                      <div key={`inline-${sexo}`} className="mb-3">
                        <Form.Check
                          inline
                          label="M"
                          name="sexo"
                          type={sexo}
                          id={`inline-${sexo}-1`}
                          onChange={(e) => setSexo("Masculino")}
                        />
                        <Form.Check
                          inline
                          label="F"
                          name="sexo"
                          type={sexo}
                          id={`inline-${sexo}-2`}
                          onChange={(e) => setSexo("Femenino")}
                        />
                      </div>
                    ))}
                  </Form>
                </Form.Group>
              </Row>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <strong>Instrucción</strong>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  value={instruccion}
                  placeholder="Ingrese las instrucciones..."
                  onChange={(e) => setInstruccion(e.target.value)}
                />
              </InputGroup>
              <Row className="mb-3 "></Row>
              <Form.Group as={Col} controlId="formGridFecha_ingreso">
                <Form.Label>
                  <strong>Fecha de ingreso</strong>
                </Form.Label>
                <DatePicker
                  selected={fecha_ingreso}
                  onChange={(date) => setFecha_ingreso(date)}
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  timeCaption="Hora"
                  className="form-control"
                  placeholderText="dd/mm/aaaa hh:mm"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  minDate={new Date("01/01/1901")}
                  maxDate={new Date()}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridFecha_salida">
                <Form.Label>
                  <strong>Fecha de salida</strong>
                </Form.Label>
                <DatePicker
                  selected={fecha_salida}
                  onChange={(date) => setFecha_salida(date)}
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  timeCaption="Hora"
                  className="form-control"
                  placeholderText="dd/mm/aaaa hh:mm"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  minDate={new Date("01/01/1901")}
                  maxDate={new Date()}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEstado-civil">
                <Form.Label>
                  <strong>Estado civil</strong>
                </Form.Label>
                <Form.Select
                  value={estado_civil}
                  defaultValue="null"
                  onChange={(e) => setEstado_civil(e.target.value)}
                >
                  <option value="null">Selecciona su estado civil...</option>
                  <option value="Soltero/a.">Soltero/a.</option>
                  <option value="Casado/a.">Casado/a.</option>
                  <option value="Divorciado/a.">Divorciado/a.</option>
                  <option value="Separado/a en proceso judicial.">
                    Separado/a en proceso judicial.
                  </option>
                  <option value="Viudo/a.">Viudo/a.</option>
                  <option value="Concubinato.">Concubinato.</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAcompanante_responsable">
                <Form.Label>
                  <strong>Acompañante responsable</strong>{" "}
                </Form.Label>
                <Form.Control
                  value={acompanante_responsable}
                  name="acompanante_responsable"
                  type="acompanante_responsable"
                  placeholder="Nombre del acompañante"
                  onChange={(e) => setAcompanante_responsable(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formGridEsetEstablecimiento_referencia"
              >
                <Form.Label>
                  <strong>Seguro Medico</strong>{" "}
                </Form.Label>
                <Form.Control
                  value={establecimiento_referencia}
                  name="establecimiento_referencia"
                  type="establecimiento_referencia"
                  placeholder="Nombre de su seguro medico"
                  onChange={(e) =>
                    setEstablecimiento_referencia(e.target.value)
                  }
                />
              </Form.Group>
              
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEsetInformantes">
                <Form.Label>
                  <strong>Informante</strong>{" "}
                </Form.Label>
                <Form.Control
                  value={informantes}
                  name="informantes"
                  type="informantes"
                  placeholder="Nombre de la persona que da la informacion"
                  onChange={(e) => setInformantes(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form>
                    <Form.Label>
                      <strong>La informacion es confiable</strong>{" "}
                    </Form.Label>
                    {["radio"].map((información_confiable) => (
                      <div  key={`inline-${información_confiable}`} className="mb-3 ">
                        <Form.Check
                          inline
                          label="Si"
                          name="información_confiable"
                          type={información_confiable}
                          id={`inline-${información_confiable}-1`}
                          onChange={(e) => setInformacion_confiable("Si")}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="información_confiable"
                          type={información_confiable}
                          id={`inline-${información_confiable}-2`}
                          onChange={(e) => setInformacion_confiable("No")}
                        />
                      </div>
                    ))}
                  </Form>
                </Form.Group>
            </Row>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                  <strong>Motivo de ingreso</strong>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  value={motivo_ingreso}
                  placeholder="Escriba los motivos de ingreso..."
                  onChange={(e) => setMotivo_ingreso(e.target.value)}
                />
              </InputGroup>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridInmunizacion">
                  <Form.Label>
                    <strong>Inmunizacion</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={inmunizacion}
                    name="inmunizacion"
                    type="inmunizacion"
                    placeholder="Inmunizacion"
                    onChange={(e) => setInmunizacion(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAntecedentes">
                  <Form.Label>
                    <strong>Antecedentes</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={antecedentes}
                    name="antecedentes"
                    type="antecedentes"
                    placeholder="Escriba los antecedentes"
                    onChange={(e) => setAntecedente(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAlergias">
                  <Form.Label>
                    <strong>Alergia</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={alergias}
                    name="alergias"
                    type="alergias"
                    placeholder="Escriba las alergias"
                    onChange={(e) => setAlergias(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridMedicamento_resetado">
                  <Form.Label>
                    <strong>Medicamento recetado</strong>{" "}
                  </Form.Label>
                  <Form.Control
                    value={medicamento_resetado}
                    name="medicamento_resetado"
                    type="medicamento_resetado"
                    placeholder="Escriba los medicamentos recetados"
                    onChange={(e) => setMedicamento_resetado(e.target.value)}
                  />
                </Form.Group>
                <InputGroup className="mb-3 pt-3">
                <InputGroup.Text>
                  <strong>Comentarios</strong>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  value={comentarios}
                  placeholder="Escriba los comentarios..."
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </InputGroup >
              </Row>
            <Button variant="primary" className="btspace" type="submit">
              Registrar Historia Clínica
            </Button>

            <Button onClick={handleClick} variant="primary" type="click">
              Atras
            </Button>
          </Form>
        )}
      </div>
    </>
  );
}
