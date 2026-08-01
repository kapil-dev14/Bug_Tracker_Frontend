import { axiosClient, unwrap } from "./axiosClient";

export const getProjectsApi = () => axiosClient.get("/projects").then(unwrap);

export const createProjectApi = (payload) =>
  axiosClient.post("/projects", payload).then(unwrap);

export const updateProjectApi = (projectId, payload) =>
  axiosClient.patch(`/projects/${projectId}`, payload).then(unwrap);

export const deleteProjectApi = (projectId) =>
  axiosClient.delete(`/projects/${projectId}`).then(unwrap);

export const addMemberApi = (projectId, identifier) =>
  axiosClient
    .post(`/projects/${projectId}/members`, { identifier })
    .then(unwrap);

export const removeMemberApi = (projectId, memberId) =>
  axiosClient.delete(`/projects/${projectId}/members/${memberId}`).then(unwrap);
