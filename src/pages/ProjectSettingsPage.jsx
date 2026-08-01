import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../hooks/useProject";
import {
  updateProjectApi,
  deleteProjectApi,
  addMemberApi,
  removeMemberApi,
} from "../api/projects.api";
import Topbar from "../components/layout/Topbar";
import MembersPanel from "../components/projects/MembersPanel";
import ProjectModal from "../components/projects/ProjectModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

export default function ProjectSettingsPage() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { project, isLoading, setProject } = useProject(projectId);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading || !project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const isOwner = project.owner?._id === user?._id;

  const handleEdit = async (payload) => {
    const updated = await updateProjectApi(projectId, payload);
    setProject((prev) => ({ ...prev, ...updated }));
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProjectApi(projectId);
    navigate("/projects");
  };

  const handleAddMember = async (memberId) => {
    const updated = await addMemberApi(projectId, memberId);
    setProject((prev) => ({ ...prev, members: updated.members }));
  };

  const handleRemoveMember = async (memberId) => {
    const updated = await removeMemberApi(projectId, memberId);
    setProject((prev) => ({ ...prev, members: updated.members }));
  };

  return (
    <>
      <Topbar title="Project settings" />

      <div className="mx-auto max-w-2xl p-6">
        <div className="panel mb-5 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-base font-semibold">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-slate-muted">
                {project.description || "No description yet."}
              </p>
            </div>
            {isOwner && (
              <div className="flex gap-1.5">
                <button
                  onClick={() => setShowEdit(true)}
                  className="rounded p-1.5 text-slate-muted hover:bg-paper hover:text-ink"
                  title="Edit project"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setShowDelete(true)}
                  className="rounded p-1.5 text-slate-muted hover:bg-paper hover:text-signal-red"
                  title="Delete project"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            )}
          </div>
          {!isOwner && (
            <p className="mt-3 text-xs text-slate-muted">
              Only the project owner can edit details or manage members.
            </p>
          )}
        </div>

        <MembersPanel
          project={project}
          isOwner={isOwner}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
        />
      </div>

      {showEdit && (
        <ProjectModal
          project={project}
          onClose={() => setShowEdit(false)}
          onSubmit={handleEdit}
        />
      )}

      {showDelete && (
        <ConfirmDialog
          title="Delete project"
          message={`Delete "${project.name}"? This can't be undone. Existing bugs and tickets under it will remain in the database but won't be reachable from the UI.`}
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  );
}
