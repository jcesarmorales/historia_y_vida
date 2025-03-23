
const HistoriaClinica = require("../database/HistoriaClinica");
const { v4: uuid } = require("uuid");
const getAllHistoriasClinicas = async () => {
  try {
    const allHistoriaClinicas = await HistoriaClinica.getAllHistoriasClinicas();
    return allHistoriaClinicas;
  } catch (error) {
    throw error;
  }
};
const getAllHcForPacient = async (idPaciente) => {
  try {
    const allHcForPaciente = await HistoriaClinica.getAllHcForPacient(idPaciente);
    return allHcForPaciente;
  } catch (error) {
    throw error;
  }
};
const getOneHistoriaClinica = async (idHc) => {
  try {
    const historiaClinica = await HistoriaClinica.getOneHistoriaClinica(idHc);
    return historiaClinica;
  } catch (error) {
    throw error;
  }
};

const createNewHistoriaClinica = async (newHistoriaClinica) => {
  const historiaClinicaToInsert = {
    ...newHistoriaClinica,
    idHc: uuid(),
  };

  try {
    const createdHistoriaClinica = await HistoriaClinica.createNewHistoriaClinica(historiaClinicaToInsert);
    return createdHistoriaClinica;
  } catch (error) {
    throw error;
  }
};

const updateOneHistoriaClinica = async (idHc, changes) => {
//   const updatepac ={
//     ...changes,
//     actualizado: new Date().toLocaleString("en-US", {
//       timeZone: "America/Bogota",
//     }),

//   };
  try {
    const updatedHistoriaClinica = await HistoriaClinica.updateOneHistoriaClinica(idHc, changes);
    return updatedHistoriaClinica;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getAllHistoriasClinicas,
    getOneHistoriaClinica,
    getAllHcForPacient,
    createNewHistoriaClinica,
    updateOneHistoriaClinica,
};