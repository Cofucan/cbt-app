import { createFileRoute, Outlet } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import "../../student/index.css";
import { AuthProvider } from "../../student/context/AuthProvider.tsx";
import { StudentDataProvider } from "../../student/context/StudentDataContext.tsx";

export const Route = createFileRoute("/student")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <StudentDataProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </StudentDataProvider>
  );
}
