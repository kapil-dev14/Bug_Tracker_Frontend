import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/projects/${project._id}`)}
      className="panel flex flex-col gap-3 p-5 text-left transition-shadow hover:shadow-lg"
    >
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{project.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-muted">
          {project.description || "No description yet."}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-muted">
        <span className="flex items-center gap-1">
          <Users size={13} />
          {project.members?.length || 0} member{project.members?.length === 1 ? "" : "s"}
        </span>
        <span>Created {formatDate(project.createdAt)}</span>
      </div>
    </button>
  );
}
