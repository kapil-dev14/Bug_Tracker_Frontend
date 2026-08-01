import { Link } from "react-router-dom";
import { Bug } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper text-center">
      <Bug size={28} className="text-slate-muted" />
      <h1 className="font-display text-xl font-semibold text-ink">Page not found</h1>
      <p className="text-sm text-slate-muted">Nothing's tracked at this URL.</p>
      <Link to="/projects" className="mt-2 text-sm font-medium text-signal-blue underline">
        Back to projects
      </Link>
    </div>
  );
}
