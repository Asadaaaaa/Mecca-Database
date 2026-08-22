'use strict';
const crypto = require('crypto');

const permissionsList = [
  { name: 'user.view', description: 'View users' },
  { name: 'user.create', description: 'Create user' },
  { name: 'user.update', description: 'Update user' },
  { name: 'user.delete', description: 'Delete user' },
  { name: 'role.view', description: 'View roles' },
  { name: 'role.create', description: 'Create role' },
  { name: 'role.update', description: 'Update role' },
  { name: 'role.delete', description: 'Delete role' },
  { name: 'role.assign', description: 'Assign role to user' },
  { name: 'permission.view', description: 'View permissions' },
  { name: 'permission.assign', description: 'Assign permission to role' },
  { name: 'whatsapp.view', description: 'View WhatsApp status & QR' },
  { name: 'whatsapp.connect', description: 'Connect WhatsApp' },
  { name: 'whatsapp.disconnect', description: 'Disconnect WhatsApp' },
  { name: 'whatsapp.sync', description: 'Sync WhatsApp messages' },
  { name: 'whatsapp.message.view', description: 'View WhatsApp messages & chats' },
  { name: 'summary.view', description: 'View daily summaries' },
  { name: 'summary.generate', description: 'Generate daily summary' },
  { name: 'todo.view', description: 'View daily todos' },
  { name: 'todo.update', description: 'Update daily todos' }
];

const whatsappSummaryPermissions = [
  'whatsapp.view',
  'whatsapp.connect',
  'whatsapp.disconnect',
  'whatsapp.sync',
  'whatsapp.message.view',
  'summary.view',
  'summary.generate',
  'todo.view',
  'todo.update'
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    
    // 1. Insert permissions
    const permissionsData = permissionsList.map(p => ({
      name: p.name,
      description: p.description,
      created_at: now,
      updated_at: now
    }));
    await queryInterface.bulkInsert('permissions', permissionsData, {});

    // 2. Insert roles
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'admin',
        description: 'Administrator with full access',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        name: 'whatsapp-summary',
        description: 'WhatsApp Summary Viewer & Operator',
        created_at: now,
        updated_at: now
      }
    ], {});

    // Query permissions back to get their IDs
    const [dbPermissions] = await queryInterface.sequelize.query('SELECT id, name FROM permissions;');

    // 3. Assign all permissions to admin (role 1)
    const rolePermissionsData = [];
    for (const perm of dbPermissions) {
      rolePermissionsData.push({
        role_id: 1,
        permission_id: perm.id,
        created_at: now,
        updated_at: now
      });

      if (whatsappSummaryPermissions.includes(perm.name)) {
        rolePermissionsData.push({
          role_id: 2,
          permission_id: perm.id,
          created_at: now,
          updated_at: now
        });
      }
    }
    await queryInterface.bulkInsert('role_permissions', rolePermissionsData, {});

    // 4. Create admin user
    const salt = process.env.HASH_SALT_PASSWORD || 'projectt_salt';
    const passwordHash = crypto.createHash('sha256').update('admin123' + (salt ? '-' + salt : '')).digest('hex');

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Administrator',
        username: 'admin',
        password: passwordHash,
        created_at: now,
        updated_at: now
      }
    ], {});

    // 5. Assign admin role to admin user
    await queryInterface.bulkInsert('user_roles', [
      {
        user_id: 1,
        role_id: 1,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
