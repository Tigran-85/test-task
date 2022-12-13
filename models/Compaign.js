const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

const Compaign = sequelize.define('Compaign', {
  id: {
    type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
  }, 
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ammount: DataTypes.INTEGER,
    expiresIn: DataTypes.DATE,
    status: DataTypes.STRING
});

module.exports = Compaign;