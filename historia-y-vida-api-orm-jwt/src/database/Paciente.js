const { Paciente }  = require("../models/pacientes.model");

/**
 * @openapi
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 1123435564
 *         Username:
 *           type: string
 *           example: Juan Martin
 *         lastName:
 *           type: string
 *           example: Mora Salcedo
 *         birthdate:
 *           type: string
 *           example: 14/04/2000
 *         tipoSangre:
 *           type: string
 *           example: O+
 *         address:
 *           type: string
 *           example: cra 6 N° 5-40
 *         Phone:
 *           type: string
 *           example: 300 887 5342
 *         fecha:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         actualizado:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */

const getOnePaciente = async (idPaciente) => {
  try {
    const paciente = await Paciente.findByPk(idPaciente);
    return paciente;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getAllPacientes = async () => {
  try {
    const pacientes = await Paciente.findAll();
    return pacientes;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const createNewPaciente = async (newPaciente) => {
  try {
    const createdPaciente = await Paciente.create(newPaciente);
    return createdPaciente;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOnePaciente = async (idPaciente, changes) => {
  try {
    const updatedPaciente = await Paciente.update(changes, {
      where: { idPaciente: idPaciente },
    });
    return updatedPaciente;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getOnePaciente,
  getAllPacientes,
  createNewPaciente,
  updateOnePaciente,
};
