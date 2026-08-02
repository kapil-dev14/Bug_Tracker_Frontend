import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  Bug,
  FolderKanban,
  LayoutGrid,
  ListChecks,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-white/10 text-paper"
      : "text-slate-muted hover:bg-white/5 hover:text-paper"
  }`;

export default function Sidebar() {
  const { projectId } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile top bar: logo + hamburger, only shown below lg */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between bg-ink px-4 text-paper lg:hidden">
        <div className="flex items-center gap-2">
          <Bug size={19} className="text-signal-amber" />
          <span className="font-display text-base font-semibold">
            Trackwork
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded p-1.5 hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Backdrop, only when the mobile drawer is open */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-ink px-3 py-5 text-paper transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:w-60 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Bug size={20} className="text-signal-amber" />
            <span className="font-display text-lg font-semibold">
              Trackwork
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded p-1 text-slate-muted hover:bg-white/10 hover:text-paper lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
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
              <NavLink
                to={`/projects/${projectId}/tickets`}
                className={linkClass}
              >
                <ListChecks size={17} />
                Ticket board
              </NavLink>
              <NavLink
                to={`/projects/${projectId}/settings`}
                className={linkClass}
              >
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
    </>
  );
}
