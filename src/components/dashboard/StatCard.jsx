export default function StatCard({ label, value, accentClass = "text-ink" }) {
  return (
    <div className="panel p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">{label}</p>
      <p className={`mt-1.5 font-display text-2xl font-semibold ${accentClass}`}>{value}</p>
    </div>
  );
}
