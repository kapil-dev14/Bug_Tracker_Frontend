import { X } from "lucide-react";

export default function Modal({ title, onClose, children, width = "max-w-md" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className={`panel w-full ${width} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between border-b border-slate-line px-5 py-4">
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-muted hover:bg-paper hover:text-ink"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
