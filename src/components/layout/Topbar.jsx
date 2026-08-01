import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function Topbar({ title, subtitle, actions }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-line bg-card px-6">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink leading-tight">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-muted">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {actions}
        <div className="flex items-center gap-2 border-l border-slate-line pl-4">
          <Avatar name={user?.fullname} />
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink">{user?.fullname}</p>
            <p className="text-xs text-slate-muted">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="ml-2 rounded p-1.5 text-slate-muted hover:bg-paper hover:text-signal-red"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
