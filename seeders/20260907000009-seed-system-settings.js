'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.rawSelect('system_settings', {
      where: { key: 'security_pin_enabled' }
    }, ['id']);

    if (!existing) {
      await queryInterface.bulkInsert('system_settings', [
        {
          key: 'security_pin_enabled',
          value: 'false',
          description: 'Status aktifasi keamanan PIN otorisasi transaksi',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          key: 'security_pin_hash',
          value: null,
          description: 'Hash SHA-256 dari 6 digit PIN otorisasi',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          key: 'force_sales_order_enabled',
          value: 'false',
          description: 'Izinkan paksa buat Sales Order walau stok kurang dengan otorisasi PIN',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('system_settings', {
      key: ['security_pin_enabled', 'security_pin_hash', 'force_sales_order_enabled']
    }, {});
  }
};
