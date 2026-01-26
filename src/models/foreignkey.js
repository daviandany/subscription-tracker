const sequelize = require('../database');
const User = require('./User');
const Subscriptions = require('./Subscriptions');

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