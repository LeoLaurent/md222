const { Sequelize, DataTypes } = require('sequelize');
path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});

signification = require("./models/signification")
prenoms = require("./models/prenoms")

module.exports = {
    sequelize: sequelize,
    model: {
        Signification: signification(sequelize),
        Prenoms: prenoms(sequelize),
    }
}