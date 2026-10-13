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
  clubs: 'clubs',
  clubPolls: 'club-polls',
  faqs: 'faqs',
};

const normalizeRecord = (record) => ({
  id: record.id || record.documentId,
  ...record.attributes,
  ...record,
});

export function getRecordId(record) {
  return record.documentId || record.id;
}

function createAuthenticatedClient(jwt) {
  return strapi({ baseURL: API_BASE_URL, auth: jwt });
}

function getPayloadData(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

async function fetchJson(path, data, client = publicClient, method = data ? 'POST' : 'GET') {
  try {
    const response = await client.fetch(path, {
      method,
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
  const [ambassadors, programs, events, clubs, clubPolls, faqs] = await Promise.all([
    fetchCollection(COLLECTIONS.ambassadors),
    fetchCollection(COLLECTIONS.programs),
    fetchCollection(COLLECTIONS.events),
    fetchCollection(COLLECTIONS.clubs),
    fetchCollection(COLLECTIONS.clubPolls),
    fetchCollection(COLLECTIONS.faqs),
  ]);

  return { ambassadors, programs, events, clubs, clubPolls, faqs };
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
  return fetchJson('users/me?populate=role', null, createAuthenticatedClient(jwt));
}

export function getUserRole(user) {
  return String(user?.role?.type || user?.role?.name || '').toLowerCase();
}

export function isAmbassadorUser(user) {
  const role = getUserRole(user);
  const identity = `${user?.username || ''} ${user?.email || ''}`.toLowerCase();
  return role.includes('ambassador') || identity.includes('ambassador');
}

export async function createClubPoll(jwt, data) {
  return fetchJson('club-polls', { data }, createAuthenticatedClient(jwt));
}

export async function createClub(jwt, data) {
  return fetchJson('clubs', { data }, createAuthenticatedClient(jwt));
}

export async function createClubEvent(jwt, data) {
  return fetchJson('events', { data }, createAuthenticatedClient(jwt));
}

async function getWritableRecordId(jwt, collection, record) {
  if (record.documentId) return record.documentId;

  const numericId = record.id;
  if (!numericId) return getRecordId(record);

  try {
    const client = createAuthenticatedClient(jwt);
    const query = new URLSearchParams({
      'filters[id][$eq]': String(numericId),
      'pagination[pageSize]': '1',
    });
    const payload = await fetchJson(`${collection}?${query}`, null, client);
    const match = getPayloadData(payload).map(normalizeRecord)[0];
    return match?.documentId || numericId;
  } catch {
    return numericId;
  }
}

async function updateCollectionRecord(jwt, collection, record, data) {
  const writableId = await getWritableRecordId(jwt, collection, record);
  return fetchJson(`${collection}/${writableId}`, { data }, createAuthenticatedClient(jwt), 'PUT');
}

export async function markPollInterested(jwt, poll, interestCount) {
  return updateCollectionRecord(jwt, 'club-polls', poll, { interestCount });
}

export async function joinClub(jwt, club, memberCount) {
  return updateCollectionRecord(jwt, 'clubs', club, { memberCount });
}

export async function markEventInterested(jwt, event, interestedCount) {
  return updateCollectionRecord(jwt, 'events', event, { interestedCount });
}
