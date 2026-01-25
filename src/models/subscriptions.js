const { DataTypes } = require('sequelize')
const sequelize = require('.../database')

const Subscriptions = sequelize.define('Subscriptions', {
    id: {
        type: DataTypes.ID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true 
    },

    userId:{
        type: DataTypes.UUID,
        allowNull: false,
    },

    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    dia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 31
        }
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category: {
        type: DataTypes.STRING,
        defaultValue: 'Outros'
    }
});

module.exports = Subscriptions;