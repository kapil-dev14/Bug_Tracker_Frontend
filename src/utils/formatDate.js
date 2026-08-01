export const formatDate = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateTime = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const timeAgo = (isoString) => {
  if (!isoString) return "—";
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  const steps = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, secs] of steps) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label[0]} ago`;
  }
  return "just now";
};
