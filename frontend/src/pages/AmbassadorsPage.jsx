import { Search } from 'lucide-react';
import { AmbassadorCard } from '../components/AmbassadorCard';
import { PageTitle } from '../components/PageTitle';
import { getRecordId } from '../services/cms';

export function AmbassadorsPage({ ambassadors, query, setQuery, navigate }) {
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
          <AmbassadorCard key={getRecordId(ambassador)} ambassador={ambassador} navigate={navigate} />
        ))}
      </section>
    </>
  );
}
