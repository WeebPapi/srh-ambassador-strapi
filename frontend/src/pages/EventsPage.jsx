import { useState } from 'react';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { InfoRow } from '../components/InfoRow';
import { PageTitle } from '../components/PageTitle';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersistentActions } from '../hooks/usePersistentActions';
import { getRecordId, markEventInterested } from '../services/cms';

export function EventsPage({ events, navigate }) {
  const { jwt, user } = useAuth();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const actions = usePersistentActions(user);

  const addInterest = async (event) => {
    if (!user) {
      navigate('/account');
      return;
    }

    if (actions.isClicked('event', event)) return;

    const nextCount = actions.getCount(event, 'interestedCount') + 1;
    actions.markClicked('event', event, 'interestedCount', nextCount);
    setMessage('');

    try {
      await markEventInterested(jwt, event, nextCount);
      setMessage(t('savedToStrapi'));
    } catch (error) {
      setMessage(t('updatedNeedsPermissions'));
    }
  };

  return (
    <>
      <PageTitle eyebrow={t('eventsEyebrow')} title={t('eventsTitle')} />
      {message && <p className="status dashboard-status">{message}</p>}
      <section className="list">
        {events.map((event) => (
          <InfoRow key={getRecordId(event)} icon={CalendarDays} title={event.title}>
            <p>{new Date(event.dateTime).toLocaleString()} - {String(event.eventType).replace('_', ' ')}</p>
            <p><MapPin size={15} /> {event.locationOrLink}</p>
            {event.club?.name && <p>{t('club')}: {event.club.name}</p>}
            <p><Users size={15} /> {actions.getCount(event, 'interestedCount')} {t('interested')}</p>
            <p>{event.description}</p>
            <div className="inline-actions">
              <button
                className="action-button"
                disabled={actions.isClicked('event', event)}
                onClick={() => addInterest(event)}
              >
                {actions.isClicked('event', event) ? t('markedInterested') : t('interested')}
              </button>
            </div>
          </InfoRow>
        ))}
      </section>
    </>
  );
}
