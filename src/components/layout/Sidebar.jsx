import { NavLink, useParams } from "react-router-dom";
import { Bug, FolderKanban, LayoutGrid, ListChecks, Settings, Users } from "lucide-react";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive ? "bg-white/10 text-paper" : "text-slate-muted hover:bg-white/5 hover:text-paper"
  }`;

export default function Sidebar() {
  const { projectId } = useParams();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-ink px-3 py-5 text-paper">
      <div className="mb-6 flex items-center gap-2 px-2">
        <Bug size={20} className="text-signal-amber" />
        <span className="font-display text-lg font-semibold">Trackwork</span>
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink to="/projects" className={linkClass} end>
          <FolderKanban size={17} />
          Projects
        </NavLink>
      </nav>

      {projectId && (
        <>
          <div className="mt-6 mb-2 px-2 text-xs font-medium uppercase tracking-wider text-slate-muted/70">
            This project
          </div>
          <nav className="flex flex-col gap-1">
            <NavLink to={`/projects/${projectId}`} className={linkClass} end>
              <LayoutGrid size={17} />
              Overview
            </NavLink>
            <NavLink to={`/projects/${projectId}/bugs`} className={linkClass}>
              <Bug size={17} />
              Bug board
            </NavLink>
            <NavLink to={`/projects/${projectId}/tickets`} className={linkClass}>
              <ListChecks size={17} />
              Ticket board
            </NavLink>
            <NavLink to={`/projects/${projectId}/settings`} className={linkClass}>
              <Settings size={17} />
              Settings
            </NavLink>
          </nav>
        </>
      )}

      <div className="mt-auto px-2 pt-4 text-xs text-slate-muted/60">
        <div className="flex items-center gap-1.5">
          <Users size={13} />
          Connected to local API
        </div>
      </div>
    </aside>
  );
}
