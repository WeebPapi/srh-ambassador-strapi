import { CalendarDays, Languages } from 'lucide-react';
import { getRecordId } from '../services/cms';
import { Avatar } from './Avatar';

export function AmbassadorCard({ ambassador, navigate }) {
  const id = getRecordId(ambassador);

  return (
    <article className="card">
      <Avatar ambassador={ambassador} />
      <h2>{ambassador.name}</h2>
      <p>{ambassador.degreeProgram}</p>
      <div className="meta"><Languages size={16} /> English / German where available</div>
      <div className="meta"><CalendarDays size={16} /> {ambassador.availability}</div>
      <button onClick={() => navigate(`/ambassadors/${id}`)}>View profile</button>
    </article>
  );
}
