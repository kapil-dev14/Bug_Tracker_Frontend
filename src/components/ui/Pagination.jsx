import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, hasNextPage, hasPrevPage, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        disabled={!hasPrevPage}
        onClick={() => onChange(page - 1)}
        className="btn-secondary px-2.5 py-1.5 disabled:opacity-40"
      >
        <ChevronLeft size={15} />
      </button>
      <span className="text-sm text-slate-muted">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={!hasNextPage}
        onClick={() => onChange(page + 1)}
        className="btn-secondary px-2.5 py-1.5 disabled:opacity-40"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
