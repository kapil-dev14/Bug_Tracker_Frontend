// Bugs and Tickets are two independent backend systems with different enum casing.

export const BUG_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED"];
export const BUG_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export const TICKET_STATUSES = ["Open", "In Progress", "Under Review", "Resolved"];
export const TICKET_PRIORITIES = ["Low", "Medium", "High", "Critical"];

// Tailwind classes keyed by normalized (uppercase) status/priority value
export const STATUS_STYLES = {
  OPEN: "bg-signal-blue/10 text-signal-blue",
  "IN PROGRESS": "bg-signal-amber/10 text-signal-amber",
  "UNDER REVIEW": "bg-slate-text/10 text-slate-text",
  RESOLVED: "bg-signal-teal/10 text-signal-teal",
};

export const PRIORITY_STYLES = {
  LOW: "bg-slate-text/10 text-slate-text",
  MEDIUM: "bg-signal-blue/10 text-signal-blue",
  HIGH: "bg-signal-amber/10 text-signal-amber",
  CRITICAL: "bg-signal-red/10 text-signal-red",
};

export const PRIORITY_BORDER = {
  LOW: "border-l-slate-line",
  MEDIUM: "border-l-signal-blue",
  HIGH: "border-l-signal-amber",
  CRITICAL: "border-l-signal-red",
};

export const normalize = (value) => (value || "").toUpperCase().trim();
