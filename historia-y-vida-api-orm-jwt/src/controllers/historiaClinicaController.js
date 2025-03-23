const historiaClinicaService = require("../services/historiaClinicaService");
const pacienteController = require("./pacienteController");

const getAllHistoriasClinicas = async (req, res) => {
  try {
    const allHistoriaClinicas =
      await historiaClinicaService.getAllHistoriasClinicas();
    res.status(200).send({ status: "OK", data: allHistoriaClinicas });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const getAllHcForPacient = async (req, res) => {
  const {
    params: { idPaciente },
  } = req;
  try {
    const allHcForPaciente = await historiaClinicaService.getAllHcForPacient(
      idPaciente
    );

    if (allHcForPaciente.length === 0) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: " No hay registros para este paciente ",
        },
      });
    } else {
      res.status(200).send({ status: "OK", data: allHcForPaciente });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneHistoriaClinica = async (req, res) => {
  const {
    params: { idHc },
  } = req;
  try {
    const HistoriaClinica = await historiaClinicaService.getOneHistoriaClinica(
      idHc
    );
    res.send({ status: "OK", data: HistoriaClinica });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewHistoriaClinica = async (req, res) => {
  const {
    idPaciente,
    nombre_paciente,
    edad,
    lugar_nacimiento,
    sexo,
    lugar_procedencia,
    instruccion,
    fecha_ingreso,
    fecha_salida,
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
  } = req.body;
  if (!idPaciente) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "los siguientes campos no pueden estar vacios: ' cedula paciente ' ",
      },
    });
    return;
  }
  const newHistoriaClinica = {
    idPaciente: idPaciente,
    nombre_paciente: nombre_paciente,
    edad: edad,
    lugar_nacimiento: lugar_nacimiento,
    sexo: sexo,
    lugar_procedencia: lugar_procedencia,
    instruccion: instruccion,
    fecha_ingreso: fecha_ingreso,
    fecha_salida: fecha_salida,
    estado_civil: estado_civil,
    acompanante_responsable: acompanante_responsable,
    establecimiento_referencia: establecimiento_referencia,
    informantes: informantes,
    información_confiable: información_confiable,
    motivo_ingreso: motivo_ingreso,
    inmunizacion: inmunizacion,
    antecedentes: antecedentes,
    alergias: alergias,
    medicamento_resetado: medicamento_resetado,
    id_medico: id_medico,
    nombre_medico: nombre_medico,
    comentarios: comentarios,
  };
  try {
    const createdHistoriaClinica =
      await historiaClinicaService.createNewHistoriaClinica(newHistoriaClinica);
    res.status(201).send({ status: "OK", data: createdHistoriaClinica });
  } catch (error) {
    
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneHistoriaClinica = async (req, res) => {
  const {
    body,
    params: { idHc },
  } = req;

  if (!idHc) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id historia clinica' can not be empty" },
    });
  }
  try {
    const updatedHistoriaClinica =
      await historiaClinicaService.updateOneHistoriaClinica(idHc, body);
    res.send({ status: "OK", data: updatedHistoriaClinica });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllHistoriasClinicas,
  getOneHistoriaClinica,
  getAllHcForPacient,
  createNewHistoriaClinica,
  updateOneHistoriaClinica,
};
