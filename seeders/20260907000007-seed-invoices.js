'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Invoices
    await queryInterface.bulkInsert('invoices', [
      {
        id: 1,
        invoice_number: 'INV-202609-001',
        customer_id: 1,
        delivery_id: 1,
        sales_order_id: 1,
        invoice_date: '2026-09-08',
        due_date: '2026-10-08',
        subtotal: 29100000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 29100000,
        paid_amount: 0,
        status: 'Belum Dibayar',
        notes: 'Tagihan pengiriman DO-202609-001 termin pertama',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        invoice_number: 'INV-202609-002',
        customer_id: 3,
        delivery_id: 2,
        sales_order_id: 3,
        invoice_date: '2026-09-06',
        due_date: '2026-10-06',
        subtotal: 62000000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 62000000,
        paid_amount: 30000000,
        status: 'Sebagian',
        notes: 'Tagihan DO-202609-002 pengadaan PDA Mobile Computer',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        invoice_number: 'INV-202608-001',
        customer_id: 2,
        delivery_id: null,
        sales_order_id: null,
        invoice_date: '2026-08-01',
        due_date: '2026-08-31',
        subtotal: 18000000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 18000000,
        paid_amount: 0,
        status: 'Jatuh Tempo',
        notes: 'Invoice pengadaan perlengkapan packing Agustus',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});

    // 2. Invoice Items
    await queryInterface.bulkInsert('invoice_items', [
      {
        id: 1,
        invoice_id: 1,
        delivery_id: 1,
        product_id: 1,
        quantity: 6,
        unit_price: 3500000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 21000000,
        total: 21000000,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        invoice_id: 1,
        delivery_id: 1,
        product_id: 2,
        quantity: 60,
        unit_price: 135000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 8100000,
        total: 8100000,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        invoice_id: 2,
        delivery_id: 2,
        product_id: 5,
        quantity: 8,
        unit_price: 7750000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 62000000,
        total: 62000000,
        created_at: now,
        updated_at: now
      },
      {
        id: 4,
        invoice_id: 3,
        delivery_id: null,
        product_id: 3,
        quantity: 100,
        unit_price: 180000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 18000000,
        total: 18000000,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoice_items', null, {});
    await queryInterface.bulkDelete('invoices', null, {});
  }
};
