# ProjectT Database

Database migrations, models, and seeders for ProjectT using Sequelize ORM and MySQL 8.0.

## 🗄️ Database Structure

- `users`: User credentials and profiles.
- `roles` & `permissions`: RBAC authorization structure.
- `user_roles` & `role_permissions`: Association tables for RBAC.
- `whatsapp_sessions`: Multi-user session isolation and status tracking.
- `whatsapp_chats`: Synced WhatsApp chats and group metadata.
- `whatsapp_messages`: Synced message history with timestamps.
- `daily_summaries`: Daily AI Markdown summaries per user and date.
- `daily_todos`: Action items and tasks extracted from daily summaries.

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.0+

### Installation
```bash
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Running Migrations & Seeds
```bash
# Run all migrations
npm run db:migrate

# Seed default admin user, roles, and permissions
npm run db:seed
```
