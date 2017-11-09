'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Make: {
        type: Sequelize.STRING
      },
      Model: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.INTEGER
      },
      Color: {
        type: Sequelize.STRING
      },
      VehicleType: {
        type: Sequelize.STRING
      },
      RetailPrice: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehicles');
  }
};