import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectOverviewPage from "./pages/ProjectOverviewPage";
import BugBoardPage from "./pages/BugBoardPage";
import TicketBoardPage from "./pages/TicketBoardPage";
import ProjectSettingsPage from "./pages/ProjectSettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectOverviewPage />} />
          <Route path="/projects/:projectId/bugs" element={<BugBoardPage />} />
          <Route path="/projects/:projectId/tickets" element={<TicketBoardPage />} />
          <Route path="/projects/:projectId/settings" element={<ProjectSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
