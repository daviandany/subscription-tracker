const sequelize = require('../database');
import User from './User';
import Subscriptions from './Subscriptions';

User.hasMany(Subscriptions, {
    foreignKey: 'userId',
    as: 'subscriptions'
});

Subscriptions.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    sequelize,
    User,
    Subscriptions
}