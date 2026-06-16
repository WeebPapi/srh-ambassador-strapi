export function PageTitle({ eyebrow, title, children }) {
  return (
    <section className="page-title">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
