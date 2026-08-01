import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen flex-1 bg-paper">
        <Outlet />
      </main>
    </div>
  );
}
