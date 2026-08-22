'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('whatsapp_messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'whatsapp_chats',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      whatsapp_message_id: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      sender: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      receiver: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      message_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'chat'
      },
      timestamp: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      is_from_me: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('whatsapp_messages', ['chat_id', 'timestamp'], {
      name: 'idx_messages_chat_timestamp'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('whatsapp_messages');
  }
};
