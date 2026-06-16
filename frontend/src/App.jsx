import { useMemo, useState } from 'react';
import { Topbar } from './components/Topbar';
import { AuthProvider } from './contexts/AuthContext';
import { useBrowserPath } from './hooks/useBrowserPath';
import { useCmsData } from './hooks/useCmsData';
import { AmbassadorDetailPage } from './pages/AmbassadorDetailPage';
import { AmbassadorsPage } from './pages/AmbassadorsPage';
import { AuthPage } from './pages/AuthPage';
import { ContactPage } from './pages/ContactPage';
import { EventsPage } from './pages/EventsPage';
import { FaqPage } from './pages/FaqPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { getRecordId } from './services/cms';
import { filterAmbassadors } from './utils/ambassadors';

export function App() {
  const data = useCmsData();
  const { path, navigate } = useBrowserPath();
  const [query, setQuery] = useState('');

  const filteredAmbassadors = useMemo(
    () => filterAmbassadors(data.ambassadors, query),
    [data.ambassadors, query],
  );

  const ambassadorMatch = path.match(/^\/ambassadors\/(.+)/);
  const selectedAmbassador = ambassadorMatch
    ? data.ambassadors.find((ambassador) => String(getRecordId(ambassador)) === ambassadorMatch[1])
    : null;

  return (
    <AuthProvider>
      <div>
        <Topbar navigate={navigate} />
        <main>
          {renderPage({
            data,
            filteredAmbassadors,
            navigate,
            path,
            query,
            selectedAmbassador,
            setQuery,
          })}
        </main>
      </div>
    </AuthProvider>
  );
}

function renderPage({ data, filteredAmbassadors, navigate, path, query, selectedAmbassador, setQuery }) {
  if (path === '/' || path === '/ambassadors') {
    return <AmbassadorsPage ambassadors={filteredAmbassadors} query={query} setQuery={setQuery} navigate={navigate} />;
  }

  if (selectedAmbassador) {
    return <AmbassadorDetailPage ambassador={selectedAmbassador} navigate={navigate} />;
  }

  if (path === '/programs') return <ProgramsPage programs={data.programs} />;
  if (path === '/events') return <EventsPage events={data.events} />;
  if (path === '/faq') return <FaqPage faqs={data.faqs} />;
  if (path === '/contact') return <ContactPage programs={data.programs} />;
  if (path === '/account') return <AuthPage />;

  return <AmbassadorsPage ambassadors={filteredAmbassadors} query={query} setQuery={setQuery} navigate={navigate} />;
}
