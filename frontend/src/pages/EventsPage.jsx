import { CalendarDays, MapPin } from 'lucide-react';
import { InfoRow } from '../components/InfoRow';
import { PageTitle } from '../components/PageTitle';
import { getRecordId } from '../services/cms';

export function EventsPage({ events }) {
  return (
    <>
      <PageTitle eyebrow="Events" title="Upcoming Ambassador Moments" />
      <section className="list">
        {events.map((event) => (
          <InfoRow key={getRecordId(event)} icon={CalendarDays} title={event.title}>
            <p>{new Date(event.dateTime).toLocaleString()} - {String(event.eventType).replace('_', ' ')}</p>
            <p><MapPin size={15} /> {event.locationOrLink}</p>
            <p>{event.description}</p>
          </InfoRow>
        ))}
      </section>
    </>
  );
}
