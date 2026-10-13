import srhLogo from '../assets/srh-logo.png';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { isAmbassadorUser } from '../services/cms';

const navItems = [
  { path: '/ambassadors', labelKey: 'ambassadors' },
  { path: '/programs', labelKey: 'programs' },
  { path: '/clubs', labelKey: 'clubs' },
  { path: '/events', labelKey: 'events' },
  { path: '/faq', labelKey: 'faq' },
  { path: '/contact', labelKey: 'contact' },
  { path: '/account', labelKey: 'account' },
];

export function Topbar({ navigate }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const ambassador = isAmbassadorUser(user);

  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate('/ambassadors')} aria-label="SRH Ambassadors home">
        <img src={srhLogo} alt="SRH" />
        <span>Ambassadors</span>
      </button>
      <nav>
        {navItems.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)}>
            {t(item.labelKey)}
          </button>
        ))}
        {ambassador && <button onClick={() => navigate('/ambassador-dashboard')}>{t('ambassadorDashboard')}</button>}
      </nav>
      {user && (
        <div className="session-chip">
          <span>{user.username}</span>
          <button onClick={logout}>{t('signOut')}</button>
        </div>
      )}
    </header>
  );
}
