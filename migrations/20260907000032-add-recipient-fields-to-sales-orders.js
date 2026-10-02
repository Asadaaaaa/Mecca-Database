'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('sales_orders');

    if (!tableInfo.recipient_name) {
      await queryInterface.addColumn('sales_orders', 'recipient_name', {
        type: Sequelize.STRING(150),
        allowNull: true,
        after: 'customer_id'
      });
    }

    if (!tableInfo.recipient_phone) {
      await queryInterface.addColumn('sales_orders', 'recipient_phone', {
        type: Sequelize.STRING(50),
        allowNull: true,
        after: 'recipient_name'
      });
    }

    if (!tableInfo.shipping_address) {
      await queryInterface.addColumn('sales_orders', 'shipping_address', {
        type: Sequelize.TEXT,
        allowNull: true,
        after: 'recipient_phone'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('sales_orders');

    if (tableInfo.shipping_address) {
      await queryInterface.removeColumn('sales_orders', 'shipping_address');
    }
    if (tableInfo.recipient_phone) {
      await queryInterface.removeColumn('sales_orders', 'recipient_phone');
    }
    if (tableInfo.recipient_name) {
      await queryInterface.removeColumn('sales_orders', 'recipient_name');
    }
  }
};
