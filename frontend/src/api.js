import { sampleData } from './sampleData';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const normalizeRecord = (record) => ({ id: record.id || record.documentId, ...record.attributes, ...record });

export async function fetchCollection(name) {
  try {
    const response = await fetch(`${API_URL}/api/${name}?populate=*`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    return payload.data.map(normalizeRecord);
  } catch {
    return sampleData[name] || [];
  }
}

export async function submitInquiry(data) {
  const response = await fetch(`${API_URL}/api/student-inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { ...data, status: 'new' } }),
  });

  if (!response.ok) {
    throw new Error('Inquiry submission failed');
  }

  return response.json();
}
