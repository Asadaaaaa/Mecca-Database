'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      pic_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      payment_terms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('customers', ['code'], { unique: true });
    await queryInterface.addIndex('customers', ['name']);
    await queryInterface.addIndex('customers', ['phone']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
