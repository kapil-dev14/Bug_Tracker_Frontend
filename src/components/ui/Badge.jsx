export default function Badge({ label, styleClass, prefix }) {
  return (
    <span className={`tag ${styleClass || "bg-slate-text/10 text-slate-text"}`}>
      {prefix && <span className="opacity-60">{prefix}</span>}
      {label}
    </span>
  );
}
