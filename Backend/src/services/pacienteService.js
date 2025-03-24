const Paciente = require("../database/Paciente");

const getAllPacientes = async () => {
  try {
    const allPacientes = await Paciente.getAllPacientes();
    return allPacientes;
  } catch (error) {
    throw error;
  }
};

const getOnePaciente = async (idPaciente) => {
  try {
    const paciente = await Paciente.getOnePaciente(idPaciente);
    return paciente;
  } catch (error) {
    throw error;
  }
};

const createNewPaciente = async (newPaciente) => {
  const pacienteToInsert = {
    ...newPaciente,
    fecha: new Date().toLocaleString(),
    actualizado: new Date().toLocaleString(),
  };

  try {
    const createdPaciente = await Paciente.createNewPaciente(pacienteToInsert);
    return createdPaciente;
  } catch (error) {
    throw error;
  }
};

const updateOnePaciente = async (idPaciente, changes) => {
  const updatepac ={
    ...changes,
    actualizado: new Date().toLocaleString("en-US", {
      timeZone: "America/Bogota",
    }),

  };
  try {
    const updatedPaciente = await Paciente.updateOnePaciente(idPaciente, updatepac);
    return updatedPaciente;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getAllPacientes,
    getOnePaciente,
    createNewPaciente,
    updateOnePaciente,
};