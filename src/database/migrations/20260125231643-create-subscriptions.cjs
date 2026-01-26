'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Subscriptions', {
      id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true 
        },
    
        userId:{
            type: Sequelize.UUID,
            allowNull: false,
        },
    
        valor: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
    
        dia: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 31
            }
        },
        platform: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    
        category: {
            type: Sequelize.STRING,
            defaultValue: 'Outros'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Subscriptions');
  }
};
