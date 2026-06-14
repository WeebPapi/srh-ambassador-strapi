import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, GraduationCap, Languages, Mail, MapPin, Search, UserRound } from 'lucide-react';
import { fetchCollection, submitInquiry } from './api';
import './styles.css';

function App() {
  const [data, setData] = useState({ ambassadors: [], programs: [], events: [], faqs: [] });
  const [path, setPath] = useState(window.location.pathname);
  const [query, setQuery] = useState('');

  useEffect(() => {
    Promise.all([
      fetchCollection('ambassadors'),
      fetchCollection('programs'),
      fetchCollection('events'),
      fetchCollection('faqs'),
    ]).then(([ambassadors, programs, events, faqs]) => setData({ ambassadors, programs, events, faqs }));
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  const filteredAmbassadors = useMemo(() => {
    return data.ambassadors.filter((ambassador) => {
      const text = `${ambassador.name} ${ambassador.degreeProgram} ${ambassador.bio}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [data.ambassadors, query]);

  const ambassadorMatch = path.match(/^\/ambassadors\/(.+)/);
  const selectedAmbassador = ambassadorMatch
    ? data.ambassadors.find((ambassador) => String(ambassador.id || ambassador.documentId) === ambassadorMatch[1])
    : null;

  return (
    <div>
      <header className="topbar">
        <button className="brand" onClick={() => navigate('/ambassadors')}>SRH Ambassadors</button>
        <nav>
          <button onClick={() => navigate('/ambassadors')}>Ambassadors</button>
          <button onClick={() => navigate('/programs')}>Programs</button>
          <button onClick={() => navigate('/events')}>Events</button>
          <button onClick={() => navigate('/faq')}>FAQ</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
        </nav>
      </header>
      <main>
        {path === '/' || path === '/ambassadors' ? (
          <Ambassadors ambassadors={filteredAmbassadors} query={query} setQuery={setQuery} navigate={navigate} />
        ) : selectedAmbassador ? (
          <AmbassadorDetail ambassador={selectedAmbassador} navigate={navigate} />
        ) : path === '/programs' ? (
          <Programs programs={data.programs} />
        ) : path === '/events' ? (
          <Events events={data.events} />
        ) : path === '/faq' ? (
          <Faq faqs={data.faqs} />
        ) : path === '/contact' ? (
          <Contact programs={data.programs} />
        ) : (
          <Ambassadors ambassadors={filteredAmbassadors} query={query} setQuery={setQuery} navigate={navigate} />
        )}
      </main>
    </div>
  );
}

function PageTitle({ eyebrow, title, children }) {
  return (
    <section className="page-title">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Ambassadors({ ambassadors, query, setQuery, navigate }) {
  return (
    <>
      <PageTitle eyebrow="SRH Berlin" title="Ambassador Directory">
        <div className="search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, program, or topic" />
        </div>
      </PageTitle>
      <section className="grid">
        {ambassadors.map((ambassador) => (
          <article className="card" key={ambassador.id || ambassador.documentId}>
            <div className="avatar"><UserRound size={28} /></div>
            <h2>{ambassador.name}</h2>
            <p>{ambassador.degreeProgram}</p>
            <div className="meta"><Languages size={16} /> English / German where available</div>
            <div className="meta"><CalendarDays size={16} /> {ambassador.availability}</div>
            <button onClick={() => navigate(`/ambassadors/${ambassador.id || ambassador.documentId}`)}>View profile</button>
          </article>
        ))}
      </section>
    </>
  );
}

function AmbassadorDetail({ ambassador, navigate }) {
  return (
    <>
      <button className="back" onClick={() => navigate('/ambassadors')}>Back to ambassadors</button>
      <section className="detail">
        <div className="avatar large"><UserRound size={46} /></div>
        <div>
          <p className="eyebrow">Ambassador profile</p>
          <h1>{ambassador.name}</h1>
          <p>{ambassador.bio}</p>
          <div className="detail-grid">
            <span><GraduationCap size={17} /> {ambassador.degreeProgram}</span>
            <span><Mail size={17} /> {String(ambassador.contactPreference).replace('_', ' ')}</span>
            <span><CalendarDays size={17} /> {ambassador.availability}</span>
          </div>
        </div>
      </section>
    </>
  );
}

function Programs({ programs }) {
  return (
    <>
      <PageTitle eyebrow="Programs" title="Study Areas Connected To Ambassadors" />
      <section className="list">
        {programs.map((program) => (
          <article className="row" key={program.id || program.documentId}>
            <GraduationCap size={22} />
            <div>
              <h2>{program.programName}</h2>
              <p>{program.degreeLevel} · {program.department}</p>
              <p>{program.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function Events({ events }) {
  return (
    <>
      <PageTitle eyebrow="Events" title="Upcoming Ambassador Moments" />
      <section className="list">
        {events.map((event) => (
          <article className="row" key={event.id || event.documentId}>
            <CalendarDays size={22} />
            <div>
              <h2>{event.title}</h2>
              <p>{new Date(event.dateTime).toLocaleString()} · {String(event.eventType).replace('_', ' ')}</p>
              <p><MapPin size={15} /> {event.locationOrLink}</p>
              <p>{event.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function Faq({ faqs }) {
  return (
    <>
      <PageTitle eyebrow="FAQ" title="Common Questions" />
      <section className="faq">
        {faqs.map((faq) => (
          <details key={faq.id || faq.documentId} open>
            <summary>{faq.title}</summary>
            <p>{faq.body}</p>
          </details>
        ))}
      </section>
    </>
  );
}

function Contact({ programs }) {
  const [form, setForm] = useState({ studentName: '', email: '', country: '', questionMessage: '' });
  const [status, setStatus] = useState('');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');
    try {
      await submitInquiry(form);
      setStatus('Inquiry submitted.');
      setForm({ studentName: '', email: '', country: '', questionMessage: '' });
    } catch {
      setStatus('Could not submit to Strapi. Check backend permissions.');
    }
  };

  return (
    <>
      <PageTitle eyebrow="Contact" title="Send A Student Inquiry" />
      <form className="form" onSubmit={onSubmit}>
        <label>Name <input value={form.studentName} onChange={(event) => update('studentName', event.target.value)} required /></label>
        <label>Email <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></label>
        <label>Country <input value={form.country} onChange={(event) => update('country', event.target.value)} required /></label>
        <label>Interested program
          <select>
            {programs.map((program) => <option key={program.id || program.documentId}>{program.programName}</option>)}
          </select>
        </label>
        <label>Question <textarea value={form.questionMessage} onChange={(event) => update('questionMessage', event.target.value)} required /></label>
        <button type="submit">Submit inquiry</button>
        {status && <p className="status">{status}</p>}
      </form>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
