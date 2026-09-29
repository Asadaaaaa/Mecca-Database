'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Make deliveries.sales_order_id nullable
    await queryInterface.changeColumn('deliveries', 'sales_order_id', {
      type: Sequelize.BIGINT,
      allowNull: true
    });

    // 2. Create junction table delivery_sales_orders
    await queryInterface.createTable('delivery_sales_orders', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
      sales_order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'sales_orders',
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

    await queryInterface.addIndex('delivery_sales_orders', ['delivery_id']);
    await queryInterface.addIndex('delivery_sales_orders', ['sales_order_id']);
    await queryInterface.addIndex('delivery_sales_orders', ['delivery_id', 'sales_order_id'], {
      unique: true,
      name: 'delivery_sales_orders_unique'
    });

    // 3. Add sales_order_id to delivery_items
    const deliveryItemsTable = await queryInterface.describeTable('delivery_items');
    if (!deliveryItemsTable.sales_order_id) {
      await queryInterface.addColumn('delivery_items', 'sales_order_id', {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'sales_orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        after: 'delivery_id'
      });
      await queryInterface.addIndex('delivery_items', ['sales_order_id']);
    }
  },

  async down(queryInterface, Sequelize) {
    const deliveryItemsTable = await queryInterface.describeTable('delivery_items');
    if (deliveryItemsTable.sales_order_id) {
      await queryInterface.removeColumn('delivery_items', 'sales_order_id');
    }

    await queryInterface.dropTable('delivery_sales_orders');

    await queryInterface.changeColumn('deliveries', 'sales_order_id', {
      type: Sequelize.BIGINT,
      allowNull: false
    });
  }
};
