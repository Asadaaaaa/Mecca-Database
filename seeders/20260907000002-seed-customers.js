'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const baseCustomers = [
      {
        code: 'CUST-2026-000001',
        name: 'PT Lorem Ipsum',
        pic_name: 'Lorem Ipsum',
        phone: '+6281234567890',
        email: 'contact@loremipsum.com',
        address: 'Jl. Jenderal Sudirman No. 101, Jakarta Pusat',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000002',
        name: 'PT John Doe',
        pic_name: 'John Doe',
        phone: '+6282121212112',
        email: 'johndoe@example.com',
        address: 'Jl. Gatot Subroto No. 45, Jakarta Selatan',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000003',
        name: 'PT Jane Doe',
        pic_name: 'Jane Doe',
        phone: '+6281399887766',
        email: 'janedoe@example.com',
        address: 'Jl. MH Thamrin No. 88, Jakarta Pusat',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000004',
        name: 'CV Lorem Sit Amet',
        pic_name: 'Dolor Sit',
        phone: '+6285712345678',
        email: 'admin@loremsit.com',
        address: 'Kawasan Industri Pulogadung Blok A, Jakarta Timur',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000005',
        name: 'PT Foo Bar Indonesia',
        pic_name: 'Foo Bar',
        phone: '+6287899001122',
        email: 'info@foobar.co.id',
        address: 'Jl. HR Rasuna Said Kav. 12, Jakarta Selatan',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000006',
        name: 'PT Acme Corporindo',
        pic_name: 'Alice Smith',
        phone: '+6281188223344',
        email: 'procurement@acme.co.id',
        address: 'Menara Mandiri Lt. 20, Jakarta Selatan',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000007',
        name: 'CV Jane Doe Commerce',
        pic_name: 'Bob Johnson',
        phone: '+6281299334455',
        email: 'finance@janedoe.com',
        address: 'Jl. Asia Afrika No. 10, Bandung',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000008',
        name: 'PT Dolor Sit Amet',
        pic_name: 'Consectetur',
        phone: '+6281355667788',
        email: 'dolorsit@example.com',
        address: 'Jl. Pemuda No. 50, Surabaya',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000009',
        name: 'UD Ipsum Perkasa',
        pic_name: 'Adipiscing',
        phone: '+6281788990011',
        email: 'ipsum@perkasa.com',
        address: 'Jl. Malioboro No. 25, Yogyakarta',
        created_at: currentMonthStart,
        updated_at: now
      },
      {
        code: 'CUST-2026-000010',
        name: 'PT John Doe Logistics',
        pic_name: 'John Doe Jr',
        phone: '+6285211223344',
        email: 'logistics@johndoe.com',
        address: 'Jl. Pelabuhan Tanjung Priok No. 7, Jakarta Utara',
        created_at: currentMonthStart,
        updated_at: now
      }
    ];

    const companyTemplates = [
      { prefix: 'PT Lorem Ipsum', pic: 'Lorem Ipsum' },
      { prefix: 'PT John Doe', pic: 'John Doe' },
      { prefix: 'PT Jane Doe', pic: 'Jane Doe' },
      { prefix: 'CV Dolor Sit Amet', pic: 'Dolor Sit' },
      { prefix: 'PT Foo Bar', pic: 'Foo Bar' },
      { prefix: 'CV Consectetur Adipiscing', pic: 'Adipiscing' },
      { prefix: 'PT Acme Solusindo', pic: 'Alice Doe' },
      { prefix: 'UD Ipsum Mandiri', pic: 'Bob Doe' },
      { prefix: 'PT John Doe Nusantara', pic: 'Charlie Doe' },
      { prefix: 'CV Jane Doe Abadi', pic: 'Diana Doe' },
      { prefix: 'PT Sit Amet Pratama', pic: 'Edward Doe' },
      { prefix: 'PT Foo Bar Logistik', pic: 'Frank Doe' }
    ];

    const customers = [...baseCustomers];

    for (let i = 11; i <= 164; i++) {
      const tpl = companyTemplates[(i - 11) % companyTemplates.length];
      const name = `${tpl.prefix} ${i}`;
      const pic_name = `${tpl.pic} ${i}`;

      customers.push({
        code: `CUST-2026-${String(i).padStart(6, '0')}`,
        name,
        pic_name,
        phone: `+6281${String(10000000 + i)}`,
        email: `contact.cust${i}@example.com`,
        address: `Jl. Kawasan Industri Megah Blok D No. ${i % 50 + 1}`,
        created_at: currentMonthStart,
        updated_at: now
      });
    }

    await queryInterface.bulkInsert('customers', customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
