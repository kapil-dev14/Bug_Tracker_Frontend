import { axiosClient, unwrap } from "./axiosClient";

export const getProjectBugsApi = (projectId, params) =>
  axiosClient.get(`/projects/${projectId}/bugs`, { params }).then(unwrap);

export const getBugSummaryApi = (projectId) =>
  axiosClient.get(`/projects/${projectId}/bugs/summary`).then(unwrap);

export const getBugByIdApi = (bugId) =>
  axiosClient.get(`/bugs/${bugId}`).then(unwrap);

// payload: { title, description, priority, assignedTo, files: File[] }
export const createBugApi = (projectId, payload) => {
  const form = new FormData();
  form.append("title", payload.title);
  form.append("description", payload.description);
  if (payload.priority) form.append("priority", payload.priority);
  if (payload.assignedTo) form.append("assignedTo", payload.assignedTo);
  (payload.files || []).forEach((file) => form.append("attachments", file));

  return axiosClient.post(`/projects/${projectId}/bugs`, form).then(unwrap);
};

export const updateBugApi = (bugId, payload) =>
  axiosClient.patch(`/bugs/${bugId}`, payload).then(unwrap);

export const deleteBugApi = (bugId) =>
  axiosClient.delete(`/bugs/${bugId}`).then(unwrap);
