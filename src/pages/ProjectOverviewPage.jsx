import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bug, ListChecks, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useProject } from "../hooks/useProject";
import { getBugSummaryApi } from "../api/bugs.api";
import Topbar from "../components/layout/Topbar";
import StatCard from "../components/dashboard/StatCard";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";

export default function ProjectOverviewPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project, isLoading: isProjectLoading } = useProject(projectId);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getBugSummaryApi(projectId).then(setSummary);
  }, [projectId]);

  if (isProjectLoading || !summary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-muted">
        Project not found.
      </div>
    );
  }

  return (
    <>
      <Topbar title={project.name} />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-slate-muted">
          {project.description || "No description yet."}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total bugs" value={summary.totalBugs} />
          <StatCard label="Open" value={summary.openBugs} accentClass="text-signal-blue" />
          <StatCard label="In progress" value={summary.inProgressBugs} accentClass="text-signal-amber" />
          <StatCard label="Critical" value={summary.criticalBugs} accentClass="text-signal-red" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="panel p-5 lg:col-span-1">
            <h3 className="mb-3 font-display text-sm font-semibold">Bug status</h3>
            <StatusPieChart summary={summary} />
          </div>

          <div className="panel flex flex-col justify-between p-5">
            <div>
              <Bug size={20} className="mb-2 text-signal-amber" />
              <h3 className="font-display text-sm font-semibold">Bug board</h3>
              <p className="mt-1 text-sm text-slate-muted">
                Track, triage and resolve reported bugs with attachments and comments.
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={() => navigate(`/projects/${projectId}/bugs`)}
            >
              Open bug board
            </Button>
          </div>

          <div className="panel flex flex-col justify-between p-5">
            <div>
              <ListChecks size={20} className="mb-2 text-signal-teal" />
              <h3 className="font-display text-sm font-semibold">Ticket board</h3>
              <p className="mt-1 text-sm text-slate-muted">
                Plan and move work items through your team's workflow.
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={() => navigate(`/projects/${projectId}/tickets`)}
            >
              Open ticket board
            </Button>
          </div>
        </div>

        {summary.criticalBugs > 0 && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-signal-red/10 px-4 py-3 text-sm text-signal-red">
            <AlertTriangle size={16} />
            {summary.criticalBugs} critical bug{summary.criticalBugs === 1 ? "" : "s"} need attention.
          </div>
        )}
        {summary.totalBugs > 0 && summary.resolvedBugs === summary.totalBugs && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-signal-teal/10 px-4 py-3 text-sm text-signal-teal">
            <CheckCircle2 size={16} />
            All reported bugs are resolved.
          </div>
        )}
      </div>
    </>
  );
}
