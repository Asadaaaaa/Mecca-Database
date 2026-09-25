'use strict';

const crypto = require('crypto');

function hashPassword(password, salt = 'meccaSalt2026') {
  return crypto.createHash('sha256').update(password + (salt ? '-' + salt : '')).digest('hex');
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Roles
    await queryInterface.bulkInsert('roles', [
      { id: 1, name: 'superadmin', description: 'Super Administrator with full access', created_at: now, updated_at: now },
      { id: 2, name: 'admin', description: 'Administrator system management', created_at: now, updated_at: now },
      { id: 3, name: 'sales', description: 'Sales Officer for quotations and orders', created_at: now, updated_at: now },
      { id: 4, name: 'warehouse', description: 'Warehouse Officer for inventory and delivery', created_at: now, updated_at: now },
      { id: 5, name: 'finance', description: 'Finance Officer for invoices and payments', created_at: now, updated_at: now },
    ], {});

    // 2. Permissions
    const permissions = [
      { id: 1, name: 'user.manage', description: 'Create, read, update, and delete users' },
      { id: 2, name: 'master.manage', description: 'Manage customer, warehouse, product master data' },
      { id: 3, name: 'inventory.manage', description: 'Manage stock-in, adjustments, and view movements' },
      { id: 4, name: 'quotation.manage', description: 'Manage sales quotations' },
      { id: 5, name: 'sales_order.manage', description: 'Manage sales orders' },
      { id: 6, name: 'delivery.manage', description: 'Manage delivery orders and stock deduction' },
      { id: 7, name: 'invoice.manage', description: 'Manage customer invoices' },
      { id: 8, name: 'payment.manage', description: 'Manage payments and invoice allocations' },
      { id: 9, name: 'report.view', description: 'View system analytics and periodic reports' },
    ].map(p => ({ ...p, created_at: now, updated_at: now }));

    await queryInterface.bulkInsert('permissions', permissions, {});

    // 3. Superadmin Role Permissions (all permissions)
    const rolePermissions = permissions.map(p => ({
      role_id: 1,
      permission_id: p.id,
      created_at: now,
      updated_at: now
    }));
    await queryInterface.bulkInsert('role_permissions', rolePermissions, {});

    // 4. Default Superadmin User
    // uuid v4
    const adminUuid = 'a0000000-0000-0000-0000-000000000001';
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        uuid: adminUuid,
        name: 'Administrator',
        email: 'admin@mecca.co.id',
        username: 'admin',
        password: hashPassword('admin123', 'meccaSalt2026'),
        status: 'active',
        created_at: now,
        updated_at: now
      }
    ], {});

    // 5. Assign superadmin role to user 1
    await queryInterface.bulkInsert('user_roles', [
      {
        id: 1,
        user_id: 1,
        role_id: 1,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
