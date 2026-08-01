export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      )}
      <input className={`input ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-signal-red">{error}</span>}
    </label>
  );
}
