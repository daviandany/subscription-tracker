import sequelize from '../database'
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

export default {
    sequelize,
    User,
    Subscriptions
}