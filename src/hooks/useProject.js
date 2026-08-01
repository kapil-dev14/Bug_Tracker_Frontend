import { useCallback, useEffect, useState } from "react";
import { getProjectsApi } from "../api/projects.api";

// NOTE: the backend only exposes GET /projects (list, scoped to the
// current user) - there's no GET /projects/:id. We fetch the list and
// pick the matching project out of it.
export function useProject(projectId) {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    const projects = await getProjectsApi();
    setProject(projects.find((p) => p._id === projectId) || null);
    setIsLoading(false);
  }, [projectId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { project, isLoading, reload, setProject };
}
