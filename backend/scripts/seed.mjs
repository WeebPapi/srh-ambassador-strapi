import fs from 'node:fs/promises';

const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const token = process.env.STRAPI_API_TOKEN;

if (!token) {
  console.error('Set STRAPI_API_TOKEN to a Strapi full-access API token before seeding.');
  process.exit(1);
}

const raw = await fs.readFile(new URL('../sample-data/srh-ambassador-data.json', import.meta.url), 'utf8');
const data = JSON.parse(raw);

const uniqueFields = {
  programs: 'programName',
  countries: 'name',
  languages: 'name',
  ambassadors: 'name',
  events: 'title',
  'faq-categories': 'name',
  faqs: 'title',
  'student-inquiries': 'email',
};

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

async function recordExists(endpoint, record) {
  const uniqueField = uniqueFields[endpoint];

  if (!uniqueField || !record[uniqueField]) {
    return false;
  }

  const query = new URLSearchParams({
    [`filters[${uniqueField}][$eq]`]: record[uniqueField],
    'pagination[pageSize]': '1',
  });

  const response = await fetch(`${baseUrl}/api/${endpoint}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to check ${endpoint}: ${response.status} ${body}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.data) && payload.data.length > 0;
}

for (const [endpoint, records] of endpoints) {
  for (const record of records) {
    if (await recordExists(endpoint, record)) {
      console.log(`Skipped existing ${endpoint}: ${record[uniqueFields[endpoint]]}`);
      continue;
    }

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

    console.log(`Created ${endpoint}: ${record[uniqueFields[endpoint]]}`);
  }
}

console.log('Seed data created.');
