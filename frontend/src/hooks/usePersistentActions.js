import { useEffect, useMemo, useState } from 'react';
import { getRecordId } from '../services/cms';

function readStoredActions(storageKey) {
  if (!storageKey) return { clicked: {}, counts: {} };

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { clicked: {}, counts: {} };
  } catch {
    return { clicked: {}, counts: {} };
  }
}

function writeStoredActions(storageKey, actions) {
  if (!storageKey) return;
  window.localStorage.setItem(storageKey, JSON.stringify(actions));
}

export function getActionKey(kind, record) {
  return `${kind}:${getRecordId(record)}`;
}

export function getCountKey(field, record) {
  return `${field}:${getRecordId(record)}`;
}

export function usePersistentActions(user) {
  const storageKey = user ? `srh-actions:${user.id || user.email}` : null;
  const [actions, setActions] = useState({ clicked: {}, counts: {} });

  useEffect(() => {
    setActions(readStoredActions(storageKey));
  }, [storageKey]);

  return useMemo(() => ({
    isClicked: (kind, record) => Boolean(actions.clicked[getActionKey(kind, record)]),
    getCount: (record, field) => Math.max(
      Number(record[field] || 0),
      Number(actions.counts[getCountKey(field, record)] || 0),
    ),
    markClicked: (kind, record, field, nextCount) => {
      const nextActions = {
        clicked: {
          ...actions.clicked,
          [getActionKey(kind, record)]: true,
        },
        counts: {
          ...actions.counts,
          [getCountKey(field, record)]: nextCount,
        },
      };

      setActions(nextActions);
      writeStoredActions(storageKey, nextActions);
    },
  }), [actions, storageKey]);
}
