import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main className="min-h-screen flex-1 bg-paper pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
