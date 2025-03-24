const pacienteService = require("../services/pacienteService");

const getAllPacientes = async (req, res) => {
  try {
    const allPacientes = await pacienteService.getAllPacientes();
    res.status(200).send({ status: "OK", data: allPacientes });
    
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  
};

const getOnePaciente = async (req, res) => {
  const {
    params: { idPaciente },
  } = req;

  try {
    const paciente = await pacienteService.getOnePaciente(idPaciente);

    if (!paciente || paciente.length === 0) {
      // Verificar si paciente es null o vacío
      res.status(404).send({
        status: "FAILED",
        data: { error: "No se encontro paciente con ese numero de id" },
      });
    } else {
      res.status(200).send({ status: "OK", data: paciente });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewPaciente = async (req, res) => {
  const {
    idPaciente,
    tipoDocument,
    username,
    lastName,
    birthdate,
    tipoSangre,
    address,
    phone,
  } = req.body;
  if (
    !idPaciente ||
    !tipoDocument ||
    !username ||
    !lastName ||
    !birthdate ||
    !tipoSangre
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "los siguientes campos no pueden estar vacios: 'numero de id ','tipo de documento ',nombres ,'apellidPacienteos ','fecha de nacimiento ','tipo de sangre ' ",
      },
    });
    return;
  }
  const newPaciente = {
    idPaciente: idPaciente,
    tipoDocument: tipoDocument,
    username: username,
    lastName: lastName,
    birthdate: birthdate,
    tipoSangre: tipoSangre,
    address: address,
    phone: phone,
  };
  try {
    const createdPaciente = await pacienteService.createNewPaciente(
      newPaciente
    );
    res.status(201).send({ status: "OK", data: createdPaciente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOnePaciente = async (req, res) => {
  const {
    body,
    params: { idPaciente },
  } = req;
  if (!idPaciente) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':cedula' can not be empty" },
    });
  }
  try {
    const updatedPaciente = await pacienteService.updateOnePaciente(
      idPaciente,
      body
    );

    res.send({ status: "OK", data: updatedPaciente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllPacientes,
  getOnePaciente,
  createNewPaciente,
  updateOnePaciente,
};
