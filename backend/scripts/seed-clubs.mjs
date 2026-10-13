import fs from 'node:fs/promises';

const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const token = process.env.STRAPI_API_TOKEN;

if (!token) {
  console.error('Set STRAPI_API_TOKEN to a Strapi API token before seeding clubs.');
  console.error('Create one in Strapi admin: Settings -> API Tokens -> Create new API Token.');
  process.exit(1);
}

const raw = await fs.readFile(new URL('../sample-data/srh-ambassador-data.json', import.meta.url), 'utf8');
const data = JSON.parse(raw);

const demoClubEvent = data.events.find((event) => event.title === 'Data Club Project Night');
const demoRecords = [
  ['clubs', data.clubs, 'name'],
  ['club-polls', data.clubPolls, 'title'],
];

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}/api/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const body = await response.text();
  const payload = body ? JSON.parse(body) : null;

  if (!response.ok) {
    throw new Error(`${options.method || 'GET'} /api/${path} failed: ${response.status} ${body}`);
  }

  return payload;
}

async function findOne(endpoint, field, value) {
  const query = new URLSearchParams({
    [`filters[${field}][$eq]`]: value,
    'pagination[pageSize]': '1',
  });
  const payload = await request(`${endpoint}?${query}`);
  return Array.isArray(payload?.data) ? payload.data[0] : null;
}

async function createIfMissing(endpoint, record, uniqueField) {
  const existing = await findOne(endpoint, uniqueField, record[uniqueField]);

  if (existing) {
    console.log(`Skipped existing ${endpoint}: ${record[uniqueField]}`);
    return existing;
  }

  const payload = await request(endpoint, {
    method: 'POST',
    body: JSON.stringify({ data: record }),
  });

  console.log(`Created ${endpoint}: ${record[uniqueField]}`);
  return payload.data;
}

for (const [endpoint, records, uniqueField] of demoRecords) {
  for (const record of records) {
    await createIfMissing(endpoint, record, uniqueField);
  }
}

if (demoClubEvent) {
  const dataClub = await findOne('clubs', 'name', 'Data & AI Club');
  const eventPayload = {
    ...demoClubEvent,
    club: dataClub?.documentId || dataClub?.id,
  };

  await createIfMissing('events', eventPayload, 'title');
}

console.log('Club demo data seeded.');
