const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Astronaut = sequelize.define('astronaut', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 200]
        },
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['COMMANDER', 'MEMBER', 'TECHNICIAN', 'FIGHTER']
        // type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //     isIn: [['POP', 'ALTERNATIVE', 'PUNK', 'JAZZ', 'NEW-WAVE']]
        // },
    }
});

module.exports = Astronaut;