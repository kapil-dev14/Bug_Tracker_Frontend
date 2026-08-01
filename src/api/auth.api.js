import { axiosClient, unwrap } from "./axiosClient";

export const registerApi = (payload) =>
  axiosClient.post("/auth/register", payload).then(unwrap);

export const loginApi = (payload) =>
  axiosClient.post("/auth/login", payload).then(unwrap);
