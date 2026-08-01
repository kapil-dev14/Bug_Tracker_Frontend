export default function Textarea({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      )}
      <textarea className={`input min-h-[100px] resize-y ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-signal-red">{error}</span>}
    </label>
  );
}
