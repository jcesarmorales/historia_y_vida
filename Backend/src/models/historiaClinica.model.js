const { sequelize } = require("../database/sequelize.config");
const { DataTypes } = require("sequelize");


const HistoriaClinica = sequelize.define("historiaClinica", {
  idHc: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  idPaciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_paciente: {
    type: DataTypes.STRING,
  } ,
  edad :{
    type: DataTypes.INTEGER,
  } ,
  lugar_nacimiento: {
    type: DataTypes.STRING,
  },
  sexo: {
    type: DataTypes.STRING,
  },
  lugar_procedencia: {
    type: DataTypes.STRING,
  },
  instruccion: {
    type: DataTypes.STRING,
  } ,
  fecha_ingreso: {
    type: DataTypes.STRING,
  } ,
  fecha_salida: {
    type: DataTypes.STRING,
  },
  estado_civil: {
    type: DataTypes.STRING,
  },
  acompanante_responsable: {
    type: DataTypes.STRING,
  } ,
  establecimiento_referencia: {
    type: DataTypes.STRING,
  },
  informantes: {
    type: DataTypes.STRING,
  },
  información_confiable: {
    type: DataTypes.STRING,
  },
  motivo_ingreso:  {
    type: DataTypes.STRING,
  },
  inmunizacion:  {
    type: DataTypes.STRING,
  },
  antecedentes:  {
    type: DataTypes.STRING,
  },
  alergias:  {
    type: DataTypes.STRING,
  },
  medicamento_resetado:  {
    type: DataTypes.STRING,
  },
  id_medico: {
    type: DataTypes.INTEGER,
  },
  nombre_medico: {
    type: DataTypes.STRING,
  },
  comentarios: {
    type: DataTypes.STRING,
  },

});

(async () => {
  await sequelize.sync(); 
})();

module.exports = { HistoriaClinica } ;
