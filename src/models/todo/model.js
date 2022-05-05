'use strict';

const todoModel = (sequelize, DataTypes) => sequelize.define('Clothes', {
  details: { type: DataTypes.STRING, required: true },
  assignee: { type: DataTypes.STRING, required: true },
  difficulty: { type: DataTypes.STRING, required: true },
  complete: { type: DataTypes.BOOLEAN, required: false },
});

module.exports = todoModel;
