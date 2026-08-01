import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // backend also sets httpOnly cookies
});

// Attach the access token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralize 401 handling: drop stale session, bounce to login
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Backend wraps everything as { statusCode, success, message, data }
export const unwrap = (res) => res.data.data;
