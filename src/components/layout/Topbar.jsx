import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function Topbar({ title, subtitle, actions }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-line bg-card px-4 py-3 sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate font-display text-lg font-semibold text-ink leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="hidden text-xs text-slate-muted sm:block">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        {actions}
        <div className="flex items-center gap-2 border-l border-slate-line pl-3 sm:pl-4">
          <Avatar name={user?.fullname} />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-ink">{user?.fullname}</p>
            <p className="text-xs text-slate-muted">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="ml-1 rounded p-1.5 text-slate-muted hover:bg-paper hover:text-signal-red sm:ml-2"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
