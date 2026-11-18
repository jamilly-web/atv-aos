const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tarefa = sequelize.define('Tarefa', {
  objectId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  concluida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Tarefa;