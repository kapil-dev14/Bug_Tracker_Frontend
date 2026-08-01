import { Search } from "lucide-react";
import Select from "../ui/Select";
import { BUG_STATUSES, BUG_PRIORITIES } from "../../utils/constants";

export default function BugFilters({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value, page: 1 });

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
        <input
          className="input pl-8"
          placeholder="Search title or description…"
          value={filters.search}
          onChange={set("search")}
        />
      </div>
      <Select
        value={filters.status}
        onChange={set("status")}
        options={[{ value: "", label: "All statuses" }, ...BUG_STATUSES.map((s) => ({ value: s, label: s.replace("_", " ") }))]}
      />
      <Select
        value={filters.priority}
        onChange={set("priority")}
        options={[{ value: "", label: "All priorities" }, ...BUG_PRIORITIES.map((p) => ({ value: p, label: p }))]}
      />
    </div>
  );
}
