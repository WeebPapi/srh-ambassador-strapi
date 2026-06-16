import { useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { getRecordId, submitInquiry } from '../services/cms';

const emptyForm = { studentName: '', email: '', country: '', questionMessage: '' };

export function ContactPage({ programs }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');
    try {
      await submitInquiry(form);
      setStatus('Inquiry submitted.');
      setForm(emptyForm);
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
            {programs.map((program) => <option key={getRecordId(program)}>{program.programName}</option>)}
          </select>
        </label>
        <label>Question <textarea value={form.questionMessage} onChange={(event) => update('questionMessage', event.target.value)} required /></label>
        <button type="submit">Submit inquiry</button>
        {status && <p className="status">{status}</p>}
      </form>
    </>
  );
}
