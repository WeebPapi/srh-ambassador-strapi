import srhLogo from '../assets/srh-logo.png';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/ambassadors', label: 'Ambassadors' },
  { path: '/programs', label: 'Programs' },
  { path: '/events', label: 'Events' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
  { path: '/account', label: 'Account' },
];

export function Topbar({ navigate }) {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <button className="brand" onClick={() => navigate('/ambassadors')} aria-label="SRH Ambassadors home">
        <img src={srhLogo} alt="SRH" />
        <span>Ambassadors</span>
      </button>
      <nav>
        {navItems.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))}
      </nav>
      {user && (
        <div className="session-chip">
          <span>{user.username}</span>
          <button onClick={logout}>Sign out</button>
        </div>
      )}
    </header>
  );
}
