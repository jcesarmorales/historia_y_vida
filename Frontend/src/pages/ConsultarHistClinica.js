import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";
import BarraNavUser from "../componentes/BarraNavUser";

export const ConsultarHistClinica = () => {
  const [idPaciente, setIdPaciente] = useState("");
  const [listaHistoriasClinicas, setListaHistoriasClinicas] = useState([]);
  const [historiaClinicaSeleccionada, setHistoriaClinicaSeleccionada] =
    useState(null);
  const [mostrarTablaHistorias, setMostrarTablaHistorias] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
    }
  }, [navigate]);

  const getAllHcForPacient = async (idPaciente) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/HistoriasClinicas/hcpaciente/${idPaciente}`
      );
      setListaHistoriasClinicas(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error al consultar el paciente:", error);
      toast.error("No se encontró el paciente.");
      setListaHistoriasClinicas([]);
    }
  };

  const getHcDetails = async (idHc) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/HistoriasClinicas/${idHc}`
      );
      setHistoriaClinicaSeleccionada(response.data.data);
      console.log(response.data.data);
      setMostrarTablaHistorias(false);
    } catch (error) {
      console.error(
        "Error al obtener los detalles de la historia clínica:",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idPaciente) {
      try {
        await getAllHcForPacient(idPaciente);
        setIdPaciente("");
        setMostrarTablaHistorias(true);
        setHistoriaClinicaSeleccionada(null);
      } catch (error) {
        console.error("Error al obtener las historias clínicas:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setIdPaciente(e.target.value);
  };

  const handleHcClick = (idHc) => {
    getHcDetails(idHc);
  };

  const handleBackToTable = () => {
    setMostrarTablaHistorias(true);
    setHistoriaClinicaSeleccionada(null);
  };

  return (
    <>
    <BarraNavUser />
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4 pt-5 T-login">Consultar Historias Clínicas</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="idPaciente" className="form-label">
                <strong>Numero de documento del Paciente:</strong>
              </label>
              <input
                type="text"
                id="idPaciente"
                className="form-control"
                value={idPaciente}
                placeholder="Ingrese el numero de documento del paciente"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </form>

          <ToastContainer />

          {mostrarTablaHistorias && listaHistoriasClinicas.length > 0 && (
            <div className="mt-4">
              <h4>Historias Clínicas</h4>
              <div className="table-responsive">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>ID historia clínica</th>
                      <td></td>
                      <th>Fecha de creación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaHistoriasClinicas.map((hc) => (
                      <tr key={hc.idHc} onClick={() => handleHcClick(hc.idHc)}>
                        <td>{hc.idHc}</td>
                        <td></td>
                        <td>
                          {new Date(hc.createdAt).toLocaleString("es-ES", {
                            timeZone: "America/Bogota",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {!mostrarTablaHistorias && historiaClinicaSeleccionada && (
            <div className="mt-4">
              <h4>Detalles de la Historia Clínica</h4>
              <div className="table-responsive">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Atributo</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ID historia clínica</td>
                      <td>{historiaClinicaSeleccionada.idHc}</td>
                    </tr>
                    <tr>
                      <td>Fecha de creación</td>
                      <td>
                        {new Date(
                          historiaClinicaSeleccionada.createdAt
                        ).toLocaleString("es-ES", {
                          timeZone: "America/Bogota",
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td>Numero de documento</td>
                      <td>{historiaClinicaSeleccionada.idPaciente}</td>
                    </tr>
                    <tr>
                      <td>Nombre del paciente</td>
                      <td>{historiaClinicaSeleccionada.nombre_paciente}</td>
                    </tr>
                    <tr>
                      <td>Edad</td>
                      <td>{historiaClinicaSeleccionada.edad}</td>
                    </tr>
                    <tr>
                      <td>Lugar de nacimiento</td>
                      <td>{historiaClinicaSeleccionada.lugar_nacimiento}</td>
                    </tr>
                    <tr>
                      <td>Sexo</td>
                      <td>{historiaClinicaSeleccionada.sexo}</td>
                    </tr>
                    <tr>
                      <td>Lugar de procedencia</td>
                      <td>{historiaClinicaSeleccionada.lugar_procedencia}</td>
                    </tr>
                    <tr>
                      <td>Instruccion</td>
                      <td>{historiaClinicaSeleccionada.instruccion}</td>
                    </tr>
                    <tr>
                      <td>Fecha de ingreso</td>
                      <td>{historiaClinicaSeleccionada.fecha_ingreso}</td>
                    </tr>
                    <tr>
                      <td>Fecha de salida</td>
                      <td>{historiaClinicaSeleccionada.fecha_salida}</td>
                    </tr>
                    <tr>
                      <td>Estado civil</td>
                      <td>{historiaClinicaSeleccionada.estado_civil}</td>
                    </tr>
                    <tr>
                      <td>Acompañante responsable</td>
                      <td>{historiaClinicaSeleccionada.acompanante_responsable}</td>
                    </tr>
                    <tr>
                      <td>Seguro Medico</td>
                      <td>{historiaClinicaSeleccionada.establecimiento_referencia}</td>
                    </tr>
                    <tr>
                      <td>Informantes</td>
                      <td>{historiaClinicaSeleccionada.informantes}</td>
                    </tr>
                    <tr>
                      <td>Información es confiable</td>
                      <td>{historiaClinicaSeleccionada.información_confiable}</td>
                    </tr>
                    <tr>
                      <td>Motivo de ingreso</td>
                      <td>{historiaClinicaSeleccionada.motivo_ingreso}</td>
                    </tr>
                    <tr>
                      <td>Inmunizacion</td>
                      <td>{historiaClinicaSeleccionada.inmunizacion}</td>
                    </tr>
                    <tr>
                      <td>Antecedentes</td>
                      <td>{historiaClinicaSeleccionada.antecedentes}</td>
                    </tr>
                    <tr>
                      <td>Alergias</td>
                      <td>{historiaClinicaSeleccionada.alergias}</td>
                    </tr>
                    <tr>
                      <td>Medicamentos resetados</td>
                      <td>{historiaClinicaSeleccionada.medicamento_resetado}</td>
                    </tr>
                    <tr>
                      <td>Numero de documento del medico</td>
                      <td>{historiaClinicaSeleccionada.id_medico}</td>
                    </tr>
                    <tr>
                      <td>Nombre del medico</td>
                      <td>{historiaClinicaSeleccionada.nombre_medico}</td>
                    </tr>
                    <tr>
                      <td>Comentarios</td>
                      <td>{historiaClinicaSeleccionada.comentarios}</td>
                    </tr>                  </tbody>
                </Table>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleBackToTable}
              >
                Volver a la tabla
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
