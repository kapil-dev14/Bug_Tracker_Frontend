import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import Select from "../ui/Select";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import ConfirmDialog from "../ui/ConfirmDialog";
import { TICKET_STATUSES, TICKET_PRIORITIES, STATUS_STYLES, PRIORITY_STYLES, normalize } from "../../utils/constants";
import { formatDateTime } from "../../utils/formatDate";

export default function TicketDetailDrawer({ ticket, onClose, onUpdate, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(ticket._id);
    setIsDeleting(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40">
      <div className="flex h-full w-full max-w-lg flex-col bg-card shadow-panel">
        <div className="flex items-center justify-between border-b border-slate-line px-5 py-4">
          <div className="flex items-center gap-2">
            <Badge label={ticket.status} styleClass={STATUS_STYLES[normalize(ticket.status)]} />
            <Badge label={ticket.priority} styleClass={PRIORITY_STYLES[normalize(ticket.priority)]} />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded p-1.5 text-slate-muted hover:bg-paper hover:text-signal-red"
              title="Delete ticket"
            >
              <Trash2 size={16} />
            </button>
            <button onClick={onClose} className="rounded p-1.5 text-slate-muted hover:bg-paper">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <h2 className="mb-1 font-display text-lg font-semibold text-ink">{ticket.title}</h2>
          <p className="mb-5 text-xs text-slate-muted">
            Created {formatDateTime(ticket.createdAt)} by {ticket.createdBy?.username || "unknown"}
          </p>

          <p className="mb-6 whitespace-pre-wrap text-sm text-slate-text">{ticket.description}</p>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <Select
              label="Status"
              value={ticket.status}
              onChange={(e) => onUpdate(ticket._id, { status: e.target.value })}
              options={TICKET_STATUSES.map((s) => ({ value: s, label: s }))}
            />
            <Select
              label="Priority"
              value={ticket.priority}
              onChange={(e) => onUpdate(ticket._id, { priority: e.target.value })}
              options={TICKET_PRIORITIES.map((p) => ({ value: p, label: p }))}
            />
          </div>

          {ticket.assignedTo?.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-ink">Assigned to</h4>
              <div className="flex flex-col gap-2">
                {ticket.assignedTo.map((member) => (
                  <div key={member._id} className="flex items-center gap-2">
                    <Avatar name={member.username} size={22} />
                    <span className="text-sm text-slate-text">{member.username}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message={`Delete "${ticket.title}"? This can't be undone.`}
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
