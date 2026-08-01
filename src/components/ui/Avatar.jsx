const COLORS = [
  "bg-signal-blue/15 text-signal-blue",
  "bg-signal-teal/15 text-signal-teal",
  "bg-signal-amber/15 text-signal-amber",
  "bg-signal-red/15 text-signal-red",
];

function colorFor(name = "") {
  const code = name.charCodeAt(0) || 0;
  return COLORS[code % COLORS.length];
}

export default function Avatar({ name, size = 28 }) {
  const initials = (name || "?").slice(0, 2).toUpperCase();
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display text-[11px] font-semibold ${colorFor(name)}`}
      style={{ width: size, height: size }}
      title={name}
    >
      {initials}
    </span>
  );
}
