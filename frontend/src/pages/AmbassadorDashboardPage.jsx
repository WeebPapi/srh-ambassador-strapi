import { useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { createClub, createClubEvent, createClubPoll, getRecordId, isAmbassadorUser } from '../services/cms';

const emptyPoll = { title: '', clubIdea: '', description: '', popularityThreshold: 20 };
const emptyClub = { name: '', category: '', description: '', memberCount: 0 };
const emptyEvent = { title: '', dateTime: '', locationOrLink: '', description: '', interestedCount: 0, club: '' };

export function AmbassadorDashboardPage({ clubs, polls, events, navigate }) {
  const auth = useAuth();
  const { t } = useLanguage();
  const [pollForm, setPollForm] = useState(emptyPoll);
  const [clubForm, setClubForm] = useState(emptyClub);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [message, setMessage] = useState('');

  if (!auth.user) {
    return (
      <>
        <PageTitle eyebrow={t('dashboardEyebrow')} title={t('dashboardSignInTitle')} />
        <section className="account-panel">
          <p>{t('dashboardSignInBody')}</p>
          <button onClick={() => navigate('/account')}>{t('signIn')}</button>
        </section>
      </>
    );
  }

  if (!isAmbassadorUser(auth.user)) {
    return (
      <>
        <PageTitle eyebrow={t('studentDashboard')} title={t('studentViewReady')} />
        <section className="account-panel">
          <p>{t('studentDashboardBody')}</p>
          <button onClick={() => navigate('/clubs')}>{t('viewClubs')}</button>
        </section>
      </>
    );
  }

  const submit = async (event, action, payload, reset) => {
    event.preventDefault();
    setMessage(t('saving'));
    try {
      await action(auth.jwt, payload);
      reset();
      setMessage(t('savedInStrapi'));
    } catch (error) {
      setMessage(error.message || t('couldNotSave'));
    }
  };

  return (
    <>
      <PageTitle eyebrow={t('dashboardEyebrow')} title={t('dashboardTitle')} />
      <section className="dashboard-grid">
        <form className="form" onSubmit={(event) => submit(event, createClubPoll, { ...pollForm, status: 'open' }, () => setPollForm(emptyPoll))}>
          <h2>{t('startInterestPoll')}</h2>
          <label>{t('pollTitle')} <input value={pollForm.title} onChange={(event) => setPollForm({ ...pollForm, title: event.target.value })} required /></label>
          <label>{t('clubIdea')} <input value={pollForm.clubIdea} onChange={(event) => setPollForm({ ...pollForm, clubIdea: event.target.value })} required /></label>
          <label>{t('description')} <textarea value={pollForm.description} onChange={(event) => setPollForm({ ...pollForm, description: event.target.value })} required /></label>
          <label>{t('popularityThreshold')} <input type="number" min="1" value={pollForm.popularityThreshold} onChange={(event) => setPollForm({ ...pollForm, popularityThreshold: Number(event.target.value) })} required /></label>
          <button type="submit">{t('createPoll')}</button>
        </form>

        <form className="form" onSubmit={(event) => submit(event, createClub, { ...clubForm, status: 'active' }, () => setClubForm(emptyClub))}>
          <h2>{t('createClub')}</h2>
          <label>{t('name')} <input value={clubForm.name} onChange={(event) => setClubForm({ ...clubForm, name: event.target.value })} required /></label>
          <label>{t('category')} <input value={clubForm.category} onChange={(event) => setClubForm({ ...clubForm, category: event.target.value })} required /></label>
          <label>{t('description')} <textarea value={clubForm.description} onChange={(event) => setClubForm({ ...clubForm, description: event.target.value })} required /></label>
          <label>{t('initialMembers')} <input type="number" min="0" value={clubForm.memberCount} onChange={(event) => setClubForm({ ...clubForm, memberCount: Number(event.target.value) })} /></label>
          <button type="submit">{t('createClubButton')}</button>
        </form>

        <form className="form" onSubmit={(event) => submit(event, createClubEvent, { ...eventForm, eventType: 'club_meetup', club: eventForm.club || undefined }, () => setEventForm(emptyEvent))}>
          <h2>{t('createClubEvent')}</h2>
          <label>{t('title')} <input value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} required /></label>
          <label>{t('dateAndTime')} <input type="datetime-local" value={eventForm.dateTime} onChange={(event) => setEventForm({ ...eventForm, dateTime: event.target.value })} required /></label>
          <label>{t('locationOrLink')} <input value={eventForm.locationOrLink} onChange={(event) => setEventForm({ ...eventForm, locationOrLink: event.target.value })} required /></label>
          <label>{t('club')}
            <select value={eventForm.club} onChange={(event) => setEventForm({ ...eventForm, club: event.target.value })}>
              <option value="">{t('noClubSelected')}</option>
              {clubs.map((club) => <option key={getRecordId(club)} value={getRecordId(club)}>{club.name}</option>)}
            </select>
          </label>
          <label>{t('description')} <textarea value={eventForm.description} onChange={(event) => setEventForm({ ...eventForm, description: event.target.value })} required /></label>
          <label>{t('interestedCount')} <input type="number" min="0" value={eventForm.interestedCount} onChange={(event) => setEventForm({ ...eventForm, interestedCount: Number(event.target.value) })} /></label>
          <button type="submit">{t('createEvent')}</button>
        </form>
      </section>
      {message && <p className="status dashboard-status">{message}</p>}

      <section className="dashboard-section">
        <h2>{t('currentSignals')}</h2>
        <div className="stats">
          <span>{polls.length} {t('polls')}</span>
          <span>{clubs.length} {t('clubs')}</span>
          <span>{events.filter((event) => event.eventType === 'club_meetup' || event.club).length} {t('clubEventsStat')}</span>
        </div>
      </section>
    </>
  );
}
