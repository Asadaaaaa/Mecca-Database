'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const deletePermissions = [
      { name: 'products.delete', description: 'Hapus master produk' },
      { name: 'product-categories.delete', description: 'Hapus kategori produk' },
      { name: 'units.delete', description: 'Hapus satuan produk' },
      { name: 'taxes.delete', description: 'Hapus tarif pajak' },
      { name: 'warehouses.delete', description: 'Hapus data gudang' },
      { name: 'customers.delete', description: 'Hapus master pelanggan' },
      { name: 'quotations.delete', description: 'Hapus penawaran penjualan' },
      { name: 'sales-orders.delete', description: 'Hapus pesanan penjualan' },
      { name: 'deliveries.delete', description: 'Hapus surat jalan / pengiriman' },
      { name: 'invoices.delete', description: 'Hapus faktur penjualan' },
      { name: 'payments.delete', description: 'Hapus pembayaran kas/bank' },
      { name: 'stock-opnames.delete', description: 'Hapus data penyesuaian opname stok' },
      { name: 'stock-wastes.delete', description: 'Hapus data pembuangan stok rusak' }
    ];

    for (const perm of deletePermissions) {
      const existing = await queryInterface.rawSelect('permissions', {
        where: { name: perm.name }
      }, ['id']);

      let permId = existing;
      if (!permId) {
        await queryInterface.bulkInsert('permissions', [{
          name: perm.name,
          description: perm.description,
          created_at: now,
          updated_at: now
        }]);
        permId = await queryInterface.rawSelect('permissions', {
          where: { name: perm.name }
        }, ['id']);
      }

      // Assign to Superadmin (role_id: 1) and Admin (role_id: 2)
      for (const roleId of [1, 2]) {
        const existingRolePerm = await queryInterface.rawSelect('role_permissions', {
          where: { role_id: roleId, permission_id: permId }
        }, ['id']);

        if (!existingRolePerm) {
          await queryInterface.bulkInsert('role_permissions', [{
            role_id: roleId,
            permission_id: permId,
            created_at: now,
            updated_at: now
          }]);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const deletePermNames = [
      'products.delete',
      'product-categories.delete',
      'units.delete',
      'taxes.delete',
      'warehouses.delete',
      'customers.delete',
      'quotations.delete',
      'sales-orders.delete',
      'deliveries.delete',
      'invoices.delete',
      'payments.delete',
      'stock-opnames.delete',
      'stock-wastes.delete'
    ];

    const perms = await queryInterface.sequelize.query(
      'SELECT id FROM permissions WHERE name IN (:names)',
      {
        replacements: { names: deletePermNames },
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    );

    if (perms.length > 0) {
      const permIds = perms.map(p => p.id);
      await queryInterface.bulkDelete('role_permissions', {
        permission_id: permIds
      });
      await queryInterface.bulkDelete('permissions', {
        id: permIds
      });
    }
  }
};
