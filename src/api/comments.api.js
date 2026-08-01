import { axiosClient, unwrap } from "./axiosClient";

export const getBugCommentsApi = (bugId) =>
  axiosClient.get(`/bugs/${bugId}/comments`).then(unwrap);

export const addCommentApi = (bugId, content) =>
  axiosClient.post(`/bugs/${bugId}/comments`, { content }).then(unwrap);

export const deleteCommentApi = (commentId) =>
  axiosClient.delete(`/comments/${commentId}`).then(unwrap);
