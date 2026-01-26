import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Subscriptions = sequelize.define('Subscriptions', {
    id: {
        type: DataTypes.UUID,
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

export default Subscriptions;