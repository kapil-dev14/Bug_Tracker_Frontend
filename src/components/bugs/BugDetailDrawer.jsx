import { useState } from "react";
import { X, Trash2, Paperclip, ExternalLink } from "lucide-react";
import Select from "../ui/Select";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import CommentThread from "../comments/CommentThread";
import {
  BUG_STATUSES,
  BUG_PRIORITIES,
  STATUS_STYLES,
  PRIORITY_STYLES,
  normalize,
} from "../../utils/constants";
import { formatDateTime } from "../../utils/formatDate";

export default function BugDetailDrawer({ bug, onClose, onUpdate, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(bug._id);
    setIsDeleting(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40">
      <div className="flex h-full w-full max-w-lg flex-col bg-card shadow-panel">
        <div className="flex items-center justify-between border-b border-slate-line px-5 py-4">
          <div className="flex items-center gap-2">
            <Badge
              label={bug.status?.replace("_", " ")}
              styleClass={STATUS_STYLES[normalize(bug.status)]}
            />
            <Badge
              label={bug.priority}
              styleClass={PRIORITY_STYLES[normalize(bug.priority)]}
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded p-1.5 text-slate-muted hover:bg-paper hover:text-signal-red"
              title="Delete bug"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="rounded p-1.5 text-slate-muted hover:bg-paper"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <h2 className="mb-1 font-display text-lg font-semibold text-ink">
            {bug.title}
          </h2>
          <p className="mb-5 text-xs text-slate-muted">
            Reported {formatDateTime(bug.createdAt)} by{" "}
            {bug.createdBy?.username || "unknown"}
          </p>

          <p className="mb-6 whitespace-pre-wrap text-sm text-slate-text">
            {bug.description}
          </p>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <Select
              label="Status"
              value={bug.status}
              onChange={(e) => onUpdate(bug._id, { status: e.target.value })}
              options={BUG_STATUSES.map((s) => ({
                value: s,
                label: s.replace("_", " "),
              }))}
            />
            <Select
              label="Priority"
              value={bug.priority}
              onChange={(e) => onUpdate(bug._id, { priority: e.target.value })}
              options={BUG_PRIORITIES.map((p) => ({ value: p, label: p }))}
            />
          </div>

          {bug.attachments?.length > 0 && (
            <div className="mb-6">
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Paperclip size={14} />
                Attachments
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {bug.attachments.map((url, idx) => {
                  const isImage = /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(
                    url,
                  );
                  return isImage ? (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-lg border border-slate-line"
                    >
                      <img
                        src={url}
                        alt={`Attachment ${idx + 1}`}
                        className="h-28 w-full object-cover transition-transform hover:scale-105"
                      />
                    </a>
                  ) : (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-line px-3 py-2 text-sm text-signal-blue hover:underline"
                    >
                      <ExternalLink size={13} />
                      Attachment {idx + 1}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-t border-slate-line pt-5">
            <CommentThread bugId={bug._id} />
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message={`Delete "${bug.title}"? This can't be undone.`}
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
