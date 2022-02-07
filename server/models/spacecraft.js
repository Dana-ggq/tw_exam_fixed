const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Spacecraft = sequelize.define('spacecraft', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 200]
        },
    },
    speed: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            min: 1000
        },
    },
    weight: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            min: 200
        },
    },

    });

module.exports = Spacecraft;