import { useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getUserRole, isAmbassadorUser } from '../services/cms';

const emptyForm = { username: '', email: '', password: '' };

function getErrorMessage(error) {
  const fieldErrors = error?.payload?.error?.details?.errors;
  if (Array.isArray(fieldErrors) && fieldErrors.length) {
    return fieldErrors.map((fieldError) => fieldError.message).join(' ');
  }

  return error?.payload?.error?.message || error?.message || 'Authentication failed.';
}

export function AuthPage() {
  const auth = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const isRegistering = mode === 'register';

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextForm = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    if (isRegistering && nextForm.username.length < 3) {
      setMessage('Username must be at least 3 characters.');
      return;
    }

    setMessage(isRegistering ? 'Creating account...' : 'Signing in...');

    try {
      if (isRegistering) {
        await auth.register(nextForm);
        setMessage('Account created. You are signed in.');
      } else {
        await auth.login({ identifier: nextForm.email, password: nextForm.password });
        setMessage('Signed in.');
      }
      setForm(emptyForm);
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  };

  if (auth.user) {
    const ambassador = isAmbassadorUser(auth.user);

    return (
      <>
        <PageTitle eyebrow={ambassador ? 'Ambassador Account' : 'Student Account'} title={ambassador ? 'Your Ambassador Dashboard Is Available' : 'You Are Signed In'} />
        <section className="account-panel">
          <p><strong>{auth.user.username}</strong></p>
          <p>{auth.user.email}</p>
          <p>Role: {getUserRole(auth.user) || (ambassador ? 'ambassador demo account' : 'student')}</p>
          <label className="language-switch account-language">
            <span>{t('language')}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </label>
          <button onClick={auth.logout}>Sign out</button>
        </section>
      </>
    );
  }

  return (
    <>
      <PageTitle eyebrow="Account" title={isRegistering ? 'Create Your Account' : 'Sign In'} />
      <form className="form" onSubmit={onSubmit}>
        <label className="language-switch account-language">
          <span>{t('language')}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </label>
        <div className="mode-switch" role="tablist" aria-label="Account mode">
          <button type="button" className={!isRegistering ? 'active' : ''} onClick={() => setMode('login')}>Sign in</button>
          <button type="button" className={isRegistering ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        </div>
        {isRegistering && (
          <label>Username <input value={form.username} onChange={(event) => update('username', event.target.value)} required /></label>
        )}
        <label>Email <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></label>
        <label>Password <input type="password" value={form.password} onChange={(event) => update('password', event.target.value)} required minLength={6} /></label>
        <button type="submit">{isRegistering ? 'Create account' : 'Sign in'}</button>
        {message && <p className="status">{message}</p>}
      </form>
    </>
  );
}
