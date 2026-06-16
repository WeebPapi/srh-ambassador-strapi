import { CalendarDays, GraduationCap, Mail } from 'lucide-react';
import { Avatar } from '../components/Avatar';

export function AmbassadorDetailPage({ ambassador, navigate }) {
  return (
    <>
      <button className="back" onClick={() => navigate('/ambassadors')}>Back to ambassadors</button>
      <section className="detail">
        <Avatar ambassador={ambassador} large />
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
