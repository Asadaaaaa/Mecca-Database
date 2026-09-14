'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Initial Stocks
    const initialStocks = [
      // WH-001 (id: 1)
      { warehouse_id: 1, product_id: 1, quantity: 150, min_stock: 50, created_at: now, updated_at: now },
      { warehouse_id: 1, product_id: 2, quantity: 220, min_stock: 40, created_at: now, updated_at: now },
      { warehouse_id: 1, product_id: 3, quantity: 350, min_stock: 60, created_at: now, updated_at: now },
      { warehouse_id: 1, product_id: 4, quantity: 400, min_stock: 50, created_at: now, updated_at: now },
      { warehouse_id: 1, product_id: 5, quantity: 25, min_stock: 10, created_at: now, updated_at: now },

      // WH-002 (id: 2)
      { warehouse_id: 2, product_id: 1, quantity: 45, min_stock: 50, created_at: now, updated_at: now },
      { warehouse_id: 2, product_id: 2, quantity: 15, min_stock: 30, created_at: now, updated_at: now },
      { warehouse_id: 2, product_id: 3, quantity: 0, min_stock: 25, created_at: now, updated_at: now },
      { warehouse_id: 2, product_id: 4, quantity: 85, min_stock: 40, created_at: now, updated_at: now },
      { warehouse_id: 2, product_id: 5, quantity: 5, min_stock: 10, created_at: now, updated_at: now }
    ];

    await queryInterface.bulkInsert('warehouse_stocks', initialStocks, {});

    // 2. Initial Stock Movements
    const movements = initialStocks.map((s, index) => ({
      id: index + 1,
      warehouse_id: s.warehouse_id,
      product_id: s.product_id,
      type: 'STOCK_IN',
      quantity: s.quantity,
      stock_before: 0,
      stock_after: s.quantity,
      reference_type: 'initial_setup',
      reference_id: null,
      notes: 'Saldo awal inventaris sistem Mecca ERP',
      created_by: 1,
      created_at: now
    }));

    await queryInterface.bulkInsert('stock_movements', movements, {});

    // 3. Sample Stock Opnames
    await queryInterface.bulkInsert('stock_opnames', [
      {
        id: 1,
        document_no: 'OPN-202609-001',
        date: '2026-09-08',
        warehouse_id: 1,
        inspector_name: 'Budi Santoso',
        items_count: 5,
        discrepancy_units: -2,
        discrepancy_value: -1700000.00,
        status: 'Disetujui',
        notes: 'Opname rutin bulanan gudang utama',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        document_no: 'OPN-202609-002',
        date: '2026-09-07',
        warehouse_id: 2,
        inspector_name: 'Dewi Lestari',
        items_count: 5,
        discrepancy_units: 0,
        discrepancy_value: 0,
        status: 'Disetujui',
        notes: 'Opname fisik transit Jawa Timur akurat',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        document_no: 'OPN-202609-003',
        date: '2026-09-06',
        warehouse_id: 1,
        inspector_name: 'Ahmad Dahlan',
        items_count: 3,
        discrepancy_units: -1,
        discrepancy_value: -850000.00,
        status: 'Menunggu Review',
        notes: 'Perbedaan perhitungan fisik barcode scanner pada rak C-04',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});

    // 4. Sample Opname Items
    await queryInterface.bulkInsert('stock_opname_items', [
      {
        stock_opname_id: 1,
        product_id: 1,
        system_stock: 152,
        physical_stock: 150,
        difference: -2,
        unit_price: 850000.00,
        discrepancy_value: -1700000.00,
        notes: 'Kemasan rusak saat perpindahan palet',
        created_at: now,
        updated_at: now
      },
      {
        stock_opname_id: 1,
        product_id: 2,
        system_stock: 220,
        physical_stock: 220,
        difference: 0,
        unit_price: 320000.00,
        discrepancy_value: 0,
        notes: 'Sesuai fisik',
        created_at: now,
        updated_at: now
      },
      {
        stock_opname_id: 2,
        product_id: 1,
        system_stock: 45,
        physical_stock: 45,
        difference: 0,
        unit_price: 850000.00,
        discrepancy_value: 0,
        notes: 'Sesuai fisik',
        created_at: now,
        updated_at: now
      },
      {
        stock_opname_id: 3,
        product_id: 1,
        system_stock: 151,
        physical_stock: 150,
        difference: -1,
        unit_price: 850000.00,
        discrepancy_value: -850000.00,
        notes: 'Perlu konfirmasi supervisor gudang',
        created_at: now,
        updated_at: now
      }
    ], {});

    // 5. Sample Stock Wastes
    await queryInterface.bulkInsert('stock_wastes', [
      {
        id: 1,
        document_no: 'WST-202609-001',
        date: '2026-09-08',
        warehouse_id: 1,
        product_id: 2,
        quantity: 2,
        unit_price: 320000.00,
        loss_amount: 640000.00,
        reason: 'Kemasan Bocor / Rusak',
        status: 'Dimusnahkan',
        notes: 'Karton thermal paper basah terkena rembesan air atap',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        document_no: 'WST-202609-002',
        date: '2026-09-07',
        warehouse_id: 2,
        product_id: 3,
        quantity: 1,
        unit_price: 450000.00,
        loss_amount: 450000.00,
        reason: 'Kualitas Turun / Lembap',
        status: 'Retur Supplier',
        notes: 'Lem lakban tidak merekat sempurna (cacat batch pabrik)',
        created_by: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        document_no: 'WST-202609-003',
        date: '2026-09-05',
        warehouse_id: 1,
        product_id: 4,
        quantity: 3,
        unit_price: 275000.00,
        loss_amount: 825000.00,
        reason: 'Kemasan Bocor / Rusak',
        status: 'Menunggu Approval',
        notes: 'Label thermal tergores forklift saat loading',
        created_by: 1,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stock_wastes', null, {});
    await queryInterface.bulkDelete('stock_opname_items', null, {});
    await queryInterface.bulkDelete('stock_opnames', null, {});
    await queryInterface.bulkDelete('stock_movements', null, {});
    await queryInterface.bulkDelete('warehouse_stocks', null, {});
  }
};
