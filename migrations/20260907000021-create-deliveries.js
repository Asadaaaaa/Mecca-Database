'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      sales_order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'sales_orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      warehouse_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'warehouses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
      delivery_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      courier_fleet: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      tracking_number: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'DRAFT'
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

    await queryInterface.addIndex('deliveries', ['delivery_number'], { unique: true });
    await queryInterface.addIndex('deliveries', ['sales_order_id']);
    await queryInterface.addIndex('deliveries', ['warehouse_id']);
    await queryInterface.addIndex('deliveries', ['customer_id']);
    await queryInterface.addIndex('deliveries', ['status']);
    await queryInterface.addIndex('deliveries', ['delivery_date']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deliveries');
  }
};
