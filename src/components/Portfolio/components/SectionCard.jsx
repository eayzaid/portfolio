function SectionCard({ id, title, delay, as = "section", children }) {
  const Component = as;

  return (
    <Component id={id} className="card reveal" style={{ "--delay": delay }}>
      <h2>{title}</h2>
      {children}
    </Component>
  );
}

export default SectionCard;
