const placeholderAvatars = [
  '/avatars/avatar-1.png',
  '/avatars/avatar-2.png',
  '/avatars/avatar-3.png',
  '/avatars/avatar-4.png',
  '/avatars/avatar-5.png',
  '/avatars/avatar-6.png',
  '/avatars/avatar-7.png',
  '/avatars/avatar-8.png',
  '/avatars/avatar-9.png',
  '/avatars/avatar-10.png',
  '/avatars/avatar-11.png',
];

export function getAmbassadorKey(ambassador) {
  return String(ambassador.id || ambassador.documentId || ambassador.name || 'ambassador');
}

export function getAvatarUrl(ambassador) {
  const key = getAmbassadorKey(ambassador);
  const hash = [...key].reduce((total, character) => total + character.charCodeAt(0), 0);
  return placeholderAvatars[hash % placeholderAvatars.length];
}

export function filterAmbassadors(ambassadors, query) {
  const normalizedQuery = query.toLowerCase();

  return ambassadors.filter((ambassador) => {
    const text = `${ambassador.name} ${ambassador.degreeProgram} ${ambassador.bio}`.toLowerCase();
    return text.includes(normalizedQuery);
  });
}
