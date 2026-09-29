'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('products');
    if (!tableInfo.cost_price) {
      await queryInterface.addColumn('products', 'cost_price', {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        after: 'selling_price'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('products');
    if (tableInfo.cost_price) {
      await queryInterface.removeColumn('products', 'cost_price');
    }
  }
};
