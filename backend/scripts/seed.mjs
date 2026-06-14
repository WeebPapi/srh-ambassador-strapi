import fs from 'node:fs/promises';

const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const token = process.env.STRAPI_API_TOKEN;

if (!token) {
  console.error('Set STRAPI_API_TOKEN to a Strapi full-access API token before seeding.');
  process.exit(1);
}

const raw = await fs.readFile(new URL('../sample-data/srh-ambassador-data.json', import.meta.url), 'utf8');
const data = JSON.parse(raw);

const endpoints = [
  ['programs', data.programs],
  ['countries', data.countries],
  ['languages', data.languages],
  ['ambassadors', data.ambassadors],
  ['events', data.events],
  ['faq-categories', data.faqCategories],
  ['faqs', data.faqs],
  ['student-inquiries', data.studentInquiries],
];

for (const [endpoint, records] of endpoints) {
  for (const record of records) {
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: record }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Failed to seed ${endpoint}: ${response.status} ${body}`);
    }
  }
}

console.log('Seed data created.');
