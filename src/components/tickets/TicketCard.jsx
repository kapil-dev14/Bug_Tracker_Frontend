import { Users } from "lucide-react";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import { PRIORITY_STYLES, STATUS_STYLES, PRIORITY_BORDER, normalize } from "../../utils/constants";
import { timeAgo } from "../../utils/formatDate";

export default function TicketCard({ ticket, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`panel flex w-full flex-col gap-2.5 border-l-4 p-4 text-left transition-shadow hover:shadow-lg ${PRIORITY_BORDER[normalize(ticket.priority)]}`}
    >
      <h4 className="text-sm font-medium text-ink line-clamp-2">{ticket.title}</h4>

      <div className="flex flex-wrap gap-1.5">
        <Badge label={ticket.status} styleClass={STATUS_STYLES[normalize(ticket.status)]} />
        <Badge label={ticket.priority} styleClass={PRIORITY_STYLES[normalize(ticket.priority)]} />
      </div>

      <div className="mt-1 flex items-center justify-between text-xs text-slate-muted">
        <span>{timeAgo(ticket.createdAt)}</span>
        {ticket.assignedTo?.length > 0 && (
          <div className="flex items-center gap-1">
            <Users size={12} />
            <div className="flex -space-x-1.5">
              {ticket.assignedTo.slice(0, 3).map((member) => (
                <Avatar key={member._id} name={member.username} size={20} />
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
