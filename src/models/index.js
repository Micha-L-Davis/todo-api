'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const todoModel = require('./todo/model.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const todo = todoModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  todo: new Collection(todo),
};
