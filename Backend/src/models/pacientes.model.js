const { sequelize } = require("../database/sequelize.config");
const { DataTypes } = require("sequelize");


const Paciente = sequelize.define(
  "paciente", {
    idPaciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tipoDocument: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoSangre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.STRING,
    },
    actualizado: {
      type: DataTypes.STRING,
    },
  });

  

(async () => {
  await sequelize.sync();
})();

module.exports = { Paciente };
