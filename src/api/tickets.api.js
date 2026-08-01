import { axiosClient, unwrap } from "./axiosClient";

export const getProjectTicketsApi = (projectId, params) =>
  axiosClient
    .get(`/tickets/project/${projectId}`, { params })
    .then(unwrap);

export const getTicketByIdApi = (ticketId) =>
  axiosClient.get(`/tickets/${ticketId}`).then(unwrap);

export const createTicketApi = (projectId, payload) =>
  axiosClient.post(`/tickets/project/${projectId}`, payload).then(unwrap);

export const updateTicketApi = (ticketId, payload) =>
  axiosClient.patch(`/tickets/${ticketId}`, payload).then(unwrap);

export const deleteTicketApi = (ticketId) =>
  axiosClient.delete(`/tickets/${ticketId}`).then(unwrap);
