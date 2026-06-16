import { strapi } from '@strapi/client';
import { sampleData } from '../sampleData';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_BASE_URL = `${API_URL}/api`;

export const AUTH_STORAGE_KEY = 'srh-strapi-auth';

const publicClient = strapi({ baseURL: API_BASE_URL });

export const COLLECTIONS = {
  ambassadors: 'ambassadors',
  programs: 'programs',
  events: 'events',
  faqs: 'faqs',
};

const normalizeRecord = (record) => ({
  id: record.id || record.documentId,
  ...record.attributes,
  ...record,
});

export function getRecordId(record) {
  return record.id || record.documentId;
}

function createAuthenticatedClient(jwt) {
  return strapi({ baseURL: API_BASE_URL, auth: jwt });
}

function getPayloadData(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

async function fetchJson(path, data, client = publicClient) {
  try {
    const response = await client.fetch(path, {
      method: data ? 'POST' : 'GET',
      headers: data ? { 'Content-Type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
    });

    return response.json();
  } catch (error) {
    const payload = await readErrorPayload(error);
    const message = payload?.error?.message || error.message || 'Strapi request failed.';
    const nextError = new Error(message);
    nextError.payload = payload;
    nextError.status = payload?.error?.status || error.response?.status;
    throw nextError;
  }
}

async function readErrorPayload(error) {
  if (!error.response) return null;

  try {
    return await error.response.clone().json();
  } catch {
    return null;
  }
}

export async function fetchCollection(name) {
  try {
    const payload = await publicClient.collection(name).find({ populate: '*' });
    return getPayloadData(payload).map(normalizeRecord);
  } catch {
    return sampleData[name] || [];
  }
}

export async function fetchHomeData() {
  const [ambassadors, programs, events, faqs] = await Promise.all([
    fetchCollection(COLLECTIONS.ambassadors),
    fetchCollection(COLLECTIONS.programs),
    fetchCollection(COLLECTIONS.events),
    fetchCollection(COLLECTIONS.faqs),
  ]);

  return { ambassadors, programs, events, faqs };
}

export async function submitInquiry(data) {
  return publicClient.collection('student-inquiries').create({ ...data, status: 'new' });
}

export async function registerUser({ username, email, password }) {
  return fetchJson('auth/local/register', {
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
}

export async function loginUser({ identifier, password }) {
  return fetchJson('auth/local', {
    identifier: identifier.trim().toLowerCase(),
    password,
  });
}

export async function fetchCurrentUser(jwt) {
  return fetchJson('users/me', null, createAuthenticatedClient(jwt));
}
