import { Paperclip, MessageSquare } from "lucide-react";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import { PRIORITY_STYLES, STATUS_STYLES, PRIORITY_BORDER, normalize } from "../../utils/constants";
import { timeAgo } from "../../utils/formatDate";

export default function BugCard({ bug, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`panel flex w-full flex-col gap-2.5 border-l-4 p-4 text-left transition-shadow hover:shadow-lg ${PRIORITY_BORDER[normalize(bug.priority)]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-ink line-clamp-2">{bug.title}</h4>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge label={bug.status?.replace("_", " ")} styleClass={STATUS_STYLES[normalize(bug.status)]} />
        <Badge label={bug.priority} styleClass={PRIORITY_STYLES[normalize(bug.priority)]} />
      </div>

      <div className="mt-1 flex items-center justify-between text-xs text-slate-muted">
        <div className="flex items-center gap-3">
          {bug.attachments?.length > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip size={12} />
              {bug.attachments.length}
            </span>
          )}
          <span>{timeAgo(bug.createdAt)}</span>
        </div>
        {bug.assignedTo && <Avatar name={bug.assignedTo.username} size={22} />}
      </div>
    </button>
  );
}
