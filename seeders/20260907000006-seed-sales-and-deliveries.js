'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);

    // 1. Quotations
    await queryInterface.bulkInsert('quotations', [
      {
        id: 1,
        quotation_number: 'QT-202609-001',
        customer_id: 1,
        quotation_date: '2026-09-01',
        valid_until: '2026-09-30',
        subtotal: 48500000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 48500000,
        status: 'Disetujui',
        notes: 'Penawaran pengadaan barcode scanner & consumable',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        quotation_number: 'QT-202609-002',
        customer_id: 2,
        quotation_date: '2026-09-03',
        valid_until: '2026-09-25',
        subtotal: 18500000,
        discount_amount: 500000,
        tax_amount: 0,
        grand_total: 18000000,
        status: 'Terkirim',
        notes: 'Penawaran perlengkapan packing',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        quotation_number: 'QT-202609-003',
        customer_id: 3,
        quotation_date: '2026-09-05',
        valid_until: '2026-10-05',
        subtotal: 34000000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 34000000,
        status: 'Draf',
        notes: 'Draft penawaran PDA mobile computer',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Quotation Items
    await queryInterface.bulkInsert('quotation_items', [
      {
        id: 1,
        quotation_id: 1,
        product_id: 1,
        quantity: 10,
        unit_price: 3500000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 35000000,
        total: 35000000,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        quotation_id: 1,
        product_id: 2,
        quantity: 100,
        unit_price: 135000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 13500000,
        total: 13500000,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        quotation_id: 2,
        product_id: 3,
        quantity: 500,
        unit_price: 37000,
        discount_amount: 500000,
        tax_amount: 0,
        subtotal: 18500000,
        total: 18000000,
        created_at: now,
        updated_at: now
      }
    ], {});

    // 2. Sales Orders
    await queryInterface.bulkInsert('sales_orders', [
      {
        id: 1,
        sales_order_number: 'SO-202609-001',
        customer_id: 1,
        quotation_id: 1,
        warehouse_id: 1,
        order_date: '2026-09-08',
        subtotal: 48500000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 48500000,
        status: 'Proses Kirim',
        notes: 'Order dari penawaran QT-202609-001',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        sales_order_number: 'SO-202609-002',
        customer_id: 2,
        quotation_id: null,
        warehouse_id: 1,
        order_date: '2026-09-07',
        subtotal: 34000000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 34000000,
        status: 'Siap Kirim',
        notes: 'Order langsung procurement reguler',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        sales_order_number: 'SO-202609-003',
        customer_id: 3,
        quotation_id: null,
        warehouse_id: 2,
        order_date: '2026-09-06',
        subtotal: 62000000,
        discount_amount: 0,
        tax_amount: 0,
        grand_total: 62000000,
        status: 'Selesai Dikirim',
        notes: 'Order PDA terminal warehouse cabang',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Sales Order Items
    await queryInterface.bulkInsert('sales_order_items', [
      {
        id: 1,
        sales_order_id: 1,
        product_id: 1,
        quantity: 10,
        delivered_quantity: 6,
        unit_price: 3500000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 35000000,
        total: 35000000,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        sales_order_id: 1,
        product_id: 2,
        quantity: 100,
        delivered_quantity: 60,
        unit_price: 135000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 13500000,
        total: 13500000,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        sales_order_id: 2,
        product_id: 3,
        quantity: 400,
        delivered_quantity: 0,
        unit_price: 85000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 34000000,
        total: 34000000,
        created_at: now,
        updated_at: now
      },
      {
        id: 4,
        sales_order_id: 3,
        product_id: 5,
        quantity: 8,
        delivered_quantity: 8,
        unit_price: 7750000,
        discount_amount: 0,
        tax_amount: 0,
        subtotal: 62000000,
        total: 62000000,
        created_at: now,
        updated_at: now
      }
    ], {});

    // 3. Deliveries
    await queryInterface.bulkInsert('deliveries', [
      {
        id: 1,
        delivery_number: 'DO-202609-001',
        sales_order_id: 1,
        warehouse_id: 1,
        customer_id: 1,
        delivery_date: '2026-09-08',
        courier_fleet: 'Truk Box Mecca 01 (B 9123 SCD)',
        tracking_number: 'MEC-TRK-001',
        status: 'Dalam Perjalanan',
        notes: 'Pengiriman termin pertama 60% pesanan',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        delivery_number: 'DO-202609-002',
        sales_order_id: 3,
        warehouse_id: 2,
        customer_id: 3,
        delivery_date: '2026-09-06',
        courier_fleet: 'JNE Trucking (JTR)',
        tracking_number: 'JNE-99218271',
        status: 'Diterima',
        notes: 'Pengiriman lengkap unit PDA',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Delivery Items
    await queryInterface.bulkInsert('delivery_items', [
      {
        id: 1,
        delivery_id: 1,
        sales_order_item_id: 1,
        product_id: 1,
        quantity: 6,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        delivery_id: 1,
        sales_order_item_id: 2,
        product_id: 2,
        quantity: 60,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        delivery_id: 2,
        sales_order_item_id: 4,
        product_id: 5,
        quantity: 8,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('delivery_items', null, {});
    await queryInterface.bulkDelete('deliveries', null, {});
    await queryInterface.bulkDelete('sales_order_items', null, {});
    await queryInterface.bulkDelete('sales_orders', null, {});
    await queryInterface.bulkDelete('quotation_items', null, {});
    await queryInterface.bulkDelete('quotations', null, {});
  }
};
