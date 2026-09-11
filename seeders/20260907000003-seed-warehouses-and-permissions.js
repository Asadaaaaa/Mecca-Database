'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Seed Warehouses
    await queryInterface.bulkInsert('warehouses', [
      {
        id: 1,
        code: 'WH-001',
        name: 'Gudang Utama Jakarta',
        address: 'Jl. Raya Industri No. 88, Kawasan Pergudangan Pulogadung, Jakarta Timur',
        pic_name: 'Budi Santoso',
        phone: '081234567890',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        code: 'WH-002',
        name: 'Gudang Transit Surabaya',
        address: 'Kawasan Industri Rungkut Megah Blok B-12, Surabaya',
        pic_name: 'Dewi Lestari',
        phone: '081987654321',
        status: 'active',
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        code: 'WH-003',
        name: 'Gudang Logistik Bandung',
        address: 'Jl. Soekarno Hatta No. 450, Batununggal, Bandung',
        pic_name: 'Hendra Gunawan',
        phone: '082133445566',
        status: 'inactive',
        created_at: now,
        updated_at: now
      }
    ], {});

    // 2. Additional Permissions if not exist
    const additionalPermissions = [
      { name: 'role.manage', description: 'Manage system roles and permission mapping' },
      { name: 'warehouse.manage', description: 'Create, update, and manage warehouses' },
      { name: 'customer.manage', description: 'Create, update, and manage customers' },
      { name: 'product.manage', description: 'Manage products, categories, units, and taxes' },
    ];

    for (const perm of additionalPermissions) {
      const existing = await queryInterface.rawSelect('permissions', {
        where: { name: perm.name },
      }, ['id']);

      if (!existing) {
        await queryInterface.bulkInsert('permissions', [{
          name: perm.name,
          description: perm.description,
          created_at: now,
          updated_at: now
        }]);
      }
    }

    // Assign all permissions to superadmin role (role_id = 1)
    const allPermissions = await queryInterface.sequelize.query(
      'SELECT id FROM permissions',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (const p of allPermissions) {
      const existingRolePerm = await queryInterface.rawSelect('role_permissions', {
        where: { role_id: 1, permission_id: p.id },
      }, ['id']);

      if (!existingRolePerm) {
        await queryInterface.bulkInsert('role_permissions', [{
          role_id: 1,
          permission_id: p.id,
          created_at: now,
          updated_at: now
        }]);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warehouses', null, {});
  }
};
