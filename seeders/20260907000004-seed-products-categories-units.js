'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Seed Units: PCS and BOX (as requested: "untuk satuan produk itu pcs dan box")
    await queryInterface.bulkInsert('units', [
      {
        id: 1,
        code: 'PCS',
        name: 'Pieces / Satuan',
        description: 'Satuan unit terkecil per buah / pcs',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        code: 'BOX',
        name: 'Box / Kotak',
        description: 'Kemasan karton / box isi multi pcs',
        status: 'active',
        created_at: now,
        updated_at: now
      }
    ], {});

    // 2. Seed Taxes
    await queryInterface.bulkInsert('taxes', [
      {
        id: 1,
        code: 'NON',
        name: 'Non Pajak (0%)',
        rate: 0.00,
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        code: 'PPN11',
        name: 'PPN 11%',
        rate: 11.00,
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        code: 'PPN12',
        name: 'PPN 12%',
        rate: 12.00,
        status: 'active',
        created_at: now,
        updated_at: now
      }
    ], {});

    // 3. Seed Categories
    await queryInterface.bulkInsert('product_categories', [
      {
        id: 1,
        code: 'CAT-001',
        name: 'Electronics & Hardware',
        description: 'Perangkat elektronik dan suku cadang hardware industri',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        code: 'CAT-002',
        name: 'Packaging & Supplies',
        description: 'Bahan pembungkus, kardus packing, dan lakban industri',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        code: 'CAT-003',
        name: 'Stationery & Office',
        description: 'Kebutuhan administrasi perkantoran dan logistik',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 4,
        code: 'CAT-004',
        name: 'Automotive Spares',
        description: 'Komponen sparepart kendaraan armada operasional',
        status: 'active',
        created_at: now,
        updated_at: now
      }
    ], {});

    // 4. Seed Products
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        code: 'PRD-001',
        name: 'Barcode Scanner Wireless 2D',
        category_id: 1,
        unit_id: 1, // PCS
        selling_price: 850000.00,
        tax_id: 2, // PPN 11%
        description: 'Pemindai barcode nirkabel bluetooth jangkauan 50 meter',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        code: 'PRD-002',
        name: 'Thermal Receipt Paper 80x80',
        category_id: 2,
        unit_id: 2, // BOX
        selling_price: 320000.00,
        tax_id: 2, // PPN 11%
        description: 'Kertas struk thermal roll isi 50 roll per box',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        code: 'PRD-003',
        name: 'Lakban Bening Heavy Duty 48mm x 100m',
        category_id: 2,
        unit_id: 2, // BOX
        selling_price: 450000.00,
        tax_id: 2, // PPN 11%
        description: 'Lakban segel karton tebal isi 72 roll per box',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 4,
        code: 'PRD-004',
        name: 'Label Barcode Semicoated 33x15 (3 Line)',
        category_id: 2,
        unit_id: 2, // BOX
        selling_price: 275000.00,
        tax_id: 1, // NON
        description: 'Kertas stiker label thermal semicoated per box',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 5,
        code: 'PRD-005',
        name: 'Handheld Mobile Computer PDA Android',
        category_id: 1,
        unit_id: 1, // PCS
        selling_price: 4750000.00,
        tax_id: 2, // PPN 11%
        description: 'Terminal PDA gudang dengan scan engine zebra terintegrasi',
        status: 'active',
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('product_categories', null, {});
    await queryInterface.bulkDelete('taxes', null, {});
    await queryInterface.bulkDelete('units', null, {});
  }
};
