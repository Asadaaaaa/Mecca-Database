'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      payment_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      payment_method: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Transfer Bank'
      },
      bank_account: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      reference_number: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'Terverifikasi'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    await queryInterface.addIndex('payments', ['payment_number'], { unique: true });
    await queryInterface.addIndex('payments', ['customer_id']);
    await queryInterface.addIndex('payments', ['payment_date']);
    await queryInterface.addIndex('payments', ['status']);
    await queryInterface.addIndex('payments', ['payment_method']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
