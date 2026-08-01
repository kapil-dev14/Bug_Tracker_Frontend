# Trackwork — Bug & Ticket Board (Frontend)

React (Vite) + Tailwind CSS frontend for the Trackwork bug tracker API. Auth, project/team management, a defect-report Bug board with attachments and comments, and a lightweight task-style Ticket board.

## Tech stack

- **React 18** + **Vite** + **React Router v6**
- **Tailwind CSS** (custom design tokens — see `tailwind.config.js`)
- **Axios** for API calls, **Recharts** for the project dashboard chart, **lucide-react** for icons

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend's /api/v1 URL
npm run dev
```

Runs on `http://localhost:5173` by default. Make sure the backend's `CORS_ORIGIN` matches this URL, or requests will be blocked.

## Features

- Register / login (JWT, persisted in `localStorage`), protected routes
- Project list, create/edit/delete, add or remove members by **username or email**
- **Bug board** — filter by status/priority/search, paginated, file attachments, per-bug comment thread, detail drawer with inline status/priority editing
- **Ticket board** — filter by status/priority, paginated, multi-assignee, detail drawer
- Project overview dashboard — bug status breakdown + KPI cards, backed by the backend's aggregate summary endpoint

## Project structure

```
src/
  api/            axios client (auth interceptor + 401 handling) + one module per backend resource
  components/
    ui/           Button, Modal, Badge, Input, Textarea, Select, Spinner,
                   EmptyState, ConfirmDialog, Avatar, Pagination
    layout/       Sidebar, Topbar
    projects/     ProjectCard, ProjectModal, MembersPanel
    bugs/         BugCard, BugFilters, BugFormModal, BugDetailDrawer
    tickets/      TicketCard, TicketFilters, TicketFormModal, TicketDetailDrawer
    comments/     CommentThread
    dashboard/    StatCard, StatusPieChart
  context/        AuthContext (currentUser, token, login/register/logout)
  hooks/          useDebounce, useProject
  layouts/        AppLayout (sidebar shell)
  pages/          one file per route
  routes/         ProtectedRoute guard
  utils/          status/priority enums + color maps, date formatting
```

## Known limitations

- No `GET /projects/:id` on the backend — project detail pages fetch the full project list and pick the match out of it (`hooks/useProject.js`). Fine for a handful of projects, won't scale to hundreds.
- Ticket board has no search box — the backend's ticket list endpoint only supports filtering by status/priority, not free-text search (Bugs does support search).
- Deleting a project does not cascade-delete its bugs/tickets on the backend — worded carefully in the settings page copy so it doesn't overpromise.
- Bugs and Tickets use different status/priority casing (`OPEN` vs `Open`) since they're separate backend systems — handled centrally in `utils/constants.js`.
- Admin vs. Developer `role` isn't enforced anywhere yet — all permissions are currently project-scoped (owner vs. member), not role-based.
