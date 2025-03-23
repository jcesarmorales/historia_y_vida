const { HistoriaClinica } = require("../models/historiaClinica.model");

/**
 * @openapi
 * components:
 *   schemas:
 *     HistoriaClinica:
 *       type: object
 *       properties:
 *         idHc:
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

const getOneHistoriaClinica = async (idHc) => {
  try {
    const historiaClinica = await HistoriaClinica.findByPk(idHc);
    return historiaClinica;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};



const getAllHistoriasClinicas = async () => {
  try {
    const historiasClincas = await HistoriaClinica.findAll();
    return historiasClincas;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getAllHcForPacient = async (idPaciente) => {
  try {
    const historiasClincas = await HistoriaClinica.findAll({where:{idPaciente : idPaciente}});
    return historiasClincas;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const createNewHistoriaClinica = async (newHistoriaClinica) => {
  try {
    const createdHistoriaClinica = await HistoriaClinica.create(
      newHistoriaClinica
    );
    return createdHistoriaClinica;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneHistoriaClinica = async (idHc, changes) => {
  try {
    const updatedHistoriaClinica = await HistoriaClinica.update(changes, {
      where: { idHc: idHc },
    });
    return updatedHistoriaClinica;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getOneHistoriaClinica,
  getAllHistoriasClinicas,
  getAllHcForPacient,
  createNewHistoriaClinica,
  updateOneHistoriaClinica,
};
