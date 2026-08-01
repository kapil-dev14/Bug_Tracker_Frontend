export default function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-line px-6 py-16 text-center">
      {Icon && <Icon size={28} className="mb-3 text-slate-muted" />}
      <p className="font-medium text-ink">{title}</p>
      {subtitle && <p className="mt-1 max-w-sm text-sm text-slate-muted">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
