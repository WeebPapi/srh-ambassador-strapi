import { useState } from 'react';
import { CalendarDays, Users } from 'lucide-react';
import { InfoRow } from '../components/InfoRow';
import { PageTitle } from '../components/PageTitle';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersistentActions } from '../hooks/usePersistentActions';
import { getRecordId, joinClub, markEventInterested, markPollInterested } from '../services/cms';

export function ClubsPage({ clubs, polls, events, navigate }) {
  const { jwt, user } = useAuth();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const actions = usePersistentActions(user);

  if (!user) {
    return (
      <>
        <PageTitle eyebrow={t('clubsEyebrow')} title={t('clubsSignInTitle')} />
        <section className="account-panel">
          <p>{t('clubsSignInBody')}</p>
          <button onClick={() => navigate('/account')}>{t('signIn')}</button>
        </section>
      </>
    );
  }

  const increment = async (kind, record, field, action) => {
    if (actions.isClicked(kind, record)) return;

    const nextCount = actions.getCount(record, field) + 1;
    actions.markClicked(kind, record, field, nextCount);
    setMessage('');

    try {
      await action(jwt, record, nextCount);
      setMessage(t('savedToStrapi'));
    } catch (error) {
      setMessage(t('updatedNeedsPermissions'));
    }
  };

  return (
    <>
      <PageTitle eyebrow={t('clubsEyebrow')} title={t('clubsTitle')} />
      <section className="grid">
        {clubs.map((club) => (
          <article className="card" key={getRecordId(club)}>
            <span className="eyebrow">{club.category}</span>
            <h2>{club.name}</h2>
            <p>{club.description}</p>
            <p className="meta"><Users size={16} /> {actions.getCount(club, 'memberCount')} {t('members')}</p>
            <button
              className="action-button"
              disabled={actions.isClicked('club', club)}
              onClick={() => increment('club', club, 'memberCount', joinClub)}
            >
              {actions.isClicked('club', club) ? t('joined') : t('joinClub')}
            </button>
          </article>
        ))}
      </section>
      {message && <p className="status dashboard-status">{message}</p>}

      <section className="dashboard-section">
        <h2>{t('openClubPolls')}</h2>
        <div className="list">
          {polls.map((poll) => (
            <InfoRow key={getRecordId(poll)} icon={Users} title={poll.title}>
              <p>{poll.description}</p>
              <p>{actions.getCount(poll, 'interestCount')} {t('interested')} / {poll.popularityThreshold || 0} {t('needed')}</p>
              <span className="pill">{poll.status}</span>
              <div className="inline-actions">
                <button
                  className="action-button"
                  disabled={actions.isClicked('poll', poll)}
                  onClick={() => increment('poll', poll, 'interestCount', markPollInterested)}
                >
                  {actions.isClicked('poll', poll) ? t('interestAdded') : t('imInterested')}
                </button>
              </div>
            </InfoRow>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>{t('clubEvents')}</h2>
        <div className="list">
          {events.filter((event) => event.eventType === 'club_meetup' || event.club).map((event) => (
            <InfoRow key={getRecordId(event)} icon={CalendarDays} title={event.title}>
              <p>{new Date(event.dateTime).toLocaleString()} - {event.locationOrLink}</p>
              <p>{actions.getCount(event, 'interestedCount')} {t('interested')}</p>
              <p>{event.description}</p>
              <div className="inline-actions">
                <button
                  className="action-button"
                  disabled={actions.isClicked('event', event)}
                  onClick={() => increment('event', event, 'interestedCount', markEventInterested)}
                >
                  {actions.isClicked('event', event) ? t('markedInterested') : t('interested')}
                </button>
              </div>
            </InfoRow>
          ))}
        </div>
      </section>
    </>
  );
}
