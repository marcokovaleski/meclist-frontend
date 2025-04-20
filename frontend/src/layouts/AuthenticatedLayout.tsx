import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./AuthenticatedLayout.css";

export default function AuthenticatedLayout() {
  return (
    <div className="authenticated-layout">
      <Sidebar />
      <main className="authenticated-content">
        <Outlet />
      </main>
    </div>
  );
}
