import { useEffect, useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import { getProjectsApi, createProjectApi } from "../api/projects.api";
import Topbar from "../components/layout/Topbar";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getProjectsApi();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (payload) => {
    const created = await createProjectApi(payload);
    setProjects((prev) => [created, ...prev]);
  };

  return (
    <>
      <Topbar
        title="Projects"
        actions={
          <Button onClick={() => setShowModal(true)}>
            <Plus size={15} />
            New project
          </Button>
        }
      />

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            subtitle="Create your first project to start tracking bugs and tickets."
            action={<Button onClick={() => setShowModal(true)}>Create project</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ProjectModal onClose={() => setShowModal(false)} onSubmit={handleCreate} />
      )}
    </>
  );
}
