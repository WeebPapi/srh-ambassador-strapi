import { PageTitle } from '../components/PageTitle';
import { getRecordId } from '../services/cms';

export function FaqPage({ faqs }) {
  return (
    <>
      <PageTitle eyebrow="FAQ" title="Common Questions" />
      <section className="faq">
        {faqs.map((faq) => (
          <details key={getRecordId(faq)} open>
            <summary>{faq.title}</summary>
            <p>{faq.body}</p>
          </details>
        ))}
      </section>
    </>
  );
}
