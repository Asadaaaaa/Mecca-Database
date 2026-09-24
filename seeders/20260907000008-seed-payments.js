'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Payments
    await queryInterface.bulkInsert('payments', [
      {
        id: 1,
        payment_number: 'PAY-202609-001',
        customer_id: 3,
        payment_date: '2026-09-07',
        amount: 30000000,
        payment_method: 'Transfer Bank',
        bank_account: 'BCA Giro Operasional (024-889123)',
        reference_number: 'TRF-BCA-889120',
        status: 'Terverifikasi',
        notes: 'Uang muka / termin 1 pengadaan PDA Mobile Computer',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        payment_number: 'PAY-202609-002',
        customer_id: 1,
        payment_date: '2026-09-08',
        amount: 15000000,
        payment_method: 'Transfer Bank',
        bank_account: 'Mandiri Corporate (120-00-98124)',
        reference_number: 'MDR-554109',
        status: 'Pending Kliring',
        notes: 'Setoran kliring via transfer Mandiri Giro',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});

    // 2. Payment Allocations
    await queryInterface.bulkInsert('payment_allocations', [
      {
        id: 1,
        payment_id: 1,
        invoice_id: 2,
        allocated_amount: 30000000,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        payment_id: 2,
        invoice_id: 1,
        allocated_amount: 15000000,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_allocations', null, {});
    await queryInterface.bulkDelete('payments', null, {});
  }
};
