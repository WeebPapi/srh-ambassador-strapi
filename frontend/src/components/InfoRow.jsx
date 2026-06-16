export function InfoRow({ icon: Icon, title, children }) {
  return (
    <article className="row">
      <Icon size={22} />
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </article>
  );
}
