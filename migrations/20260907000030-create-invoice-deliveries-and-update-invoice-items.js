'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create junction table invoice_deliveries
    await queryInterface.createTable('invoice_deliveries', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      invoice_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'invoices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      delivery_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'deliveries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.addIndex('invoice_deliveries', ['invoice_id']);
    await queryInterface.addIndex('invoice_deliveries', ['delivery_id']);
    await queryInterface.addIndex('invoice_deliveries', ['invoice_id', 'delivery_id'], {
      unique: true,
      name: 'invoice_deliveries_unique'
    });

    // 2. Add columns to invoice_items
    const invoiceItemsTable = await queryInterface.describeTable('invoice_items');

    if (!invoiceItemsTable.delivery_item_id) {
      await queryInterface.addColumn('invoice_items', 'delivery_item_id', {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'delivery_items',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        after: 'delivery_id'
      });
      await queryInterface.addIndex('invoice_items', ['delivery_item_id']);
    }

    if (!invoiceItemsTable.sales_order_id) {
      await queryInterface.addColumn('invoice_items', 'sales_order_id', {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'sales_orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        after: 'delivery_item_id'
      });
      await queryInterface.addIndex('invoice_items', ['sales_order_id']);
    }

    if (!invoiceItemsTable.sales_order_item_id) {
      await queryInterface.addColumn('invoice_items', 'sales_order_item_id', {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'sales_order_items',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        after: 'sales_order_id'
      });
      await queryInterface.addIndex('invoice_items', ['sales_order_item_id']);
    }
  },

  async down(queryInterface, Sequelize) {
    const invoiceItemsTable = await queryInterface.describeTable('invoice_items');

    if (invoiceItemsTable.sales_order_item_id) {
      await queryInterface.removeColumn('invoice_items', 'sales_order_item_id');
    }
    if (invoiceItemsTable.sales_order_id) {
      await queryInterface.removeColumn('invoice_items', 'sales_order_id');
    }
    if (invoiceItemsTable.delivery_item_id) {
      await queryInterface.removeColumn('invoice_items', 'delivery_item_id');
    }

    await queryInterface.dropTable('invoice_deliveries');
  }
};
