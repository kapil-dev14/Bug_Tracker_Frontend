import Select from "../ui/Select";
import { TICKET_STATUSES, TICKET_PRIORITIES } from "../../utils/constants";

export default function TicketFilters({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value, page: 1 });

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={filters.status}
        onChange={set("status")}
        options={[{ value: "", label: "All statuses" }, ...TICKET_STATUSES.map((s) => ({ value: s, label: s }))]}
      />
      <Select
        value={filters.priority}
        onChange={set("priority")}
        options={[{ value: "", label: "All priorities" }, ...TICKET_PRIORITIES.map((p) => ({ value: p, label: p }))]}
      />
    </div>
  );
}
