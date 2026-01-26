const sequelize = require('../database');
import User from './User';
import Subscriptions from './Subscriptions';

User.hasMany(Subscriptions, {
    foreignKey: 'userId',
    as: 'plataform'
});

Subscriptions.belongsTo(User, {
    foreignKey: 'userId',
    as: 'dono'
});

module.exports = {
    sequelize,
    User,
    Subscriptions
}